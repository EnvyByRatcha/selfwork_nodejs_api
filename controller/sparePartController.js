const { PrismaClient } = require("@prisma/client");
const { remove } = require("./userController");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      const { name, cost, productId } = req.body;

      await prisma.sparePart.create({
        data: {
          name,
          cost,
          productId,
          status: "use",
          qty: 0,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  edit: async (req, res) => {
    try {
      const { id: name, cost, productId } = req.body;

      await prisma.sparePart.update({
        data: {
          name,
          cost,
          productId,
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
      const results = await prisma.sparePart.findMany({
        where: {
          status: "used",
        },
      });

      return res.send({ results: results });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.sparePart.update({
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
};
