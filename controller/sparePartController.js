const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createPart: async (req, res) => {
    try {
      const { name } = req.body;

      await prisma.sparePar.create({
        data: {
          name,
        },
      });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await prisma.category.create({
        data: {
          name,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
