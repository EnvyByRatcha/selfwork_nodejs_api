const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username == "" || password == "") {
        return res.status(401).send("unauthorized");
      }

      const user = await prisma.user.findFirst({
        where: {
          username,
          password,
          status: "use",
        },
      });
      if (user != null) {
        const key = process.env.SECRET_KEY;
        const token = jwt.sign(user, key, { expiresIn: "1d" });

        return res.send({ token: token, name: user.name, id: user.id });
      } else {
        return res.status(401).send("unauthorized");
      }
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
