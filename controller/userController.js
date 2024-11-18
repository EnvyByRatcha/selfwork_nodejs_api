const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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
          status: "used",
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
  create: async (req, res) => {
    try {
      const { name, username, password, role } = req.body;

      await prisma.user.create({
        data: {
          name,
          username,
          password,
          role,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, password, role, id } = req.body;

      await prisma.user.update({
        data: {
          name,
          password,
          role,
        },
        where: {
          id: parseInt(id),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.user.update({
        data: {
          status: "unused",
        },
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      let results;
      if (req.params.role == "all") {
        results = await prisma.user.findMany({
          where: {
            status: "used",
          },
          orderBy: {
            id: "desc",
          },
        });
      } else {
        results = await prisma.user.findMany({
          where: {
            role: req.params.role,
            status: "used",
          },
          orderBy: {
            id: "desc",
          },
        });
      }

      return res.send({ results: results });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
