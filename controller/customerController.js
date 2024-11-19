const { PrismaClient } = require("@prisma/client");
const { create } = require("domain");
const { list, update } = require("./userController");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      const { name, code, address, email, contact1, contact2 } = req.body;

      await prisma.customer.create({
        data: {
          name,
          code,
          address,
          email,
          contact1,
          contact2,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const results = await prisma.customer.findMany({
        where: {
          status: "used",
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.send({ results: results });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.customer.update({
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
  update: async (req, res) => {
    try {
      const { id, name, code, address, email, contact1, contact2 } = req.body;

      await prisma.customer.update({
        data: {
          name,
          code,
          address,
          email,
          contact1,
          contact2,
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
};
