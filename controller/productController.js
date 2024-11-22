const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, cost, qty, categoryId } = req.body;

      await prisma.product.create({
        data: {
          name,
          cost,
          qty,
          categoryId: parseInt(categoryId),
        },
      });

      return res.send({ message: "success" });
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
  createProductDetail: async (req, res) => {
    try {
      const { serialNumber, productId } = req.body;

      await prisma.productDetail.create({
        data: {
          serialNumber,
          productId: parseInt(productId),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  listProduct: async (req, res) => {
    try {
      const results = await prisma.product.findMany({
        include: {
          Category: true,
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
  listCategory: async (req, res) => {
    try {
      const results = await prisma.category.findMany();

      return res.send({ results: results });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  listProductDetail: async (req, res) => {
    try {
      const results = await prisma.productDetail.findMany({
        include: {
          Product: {
            include: {
              Category: true,
            },
          },
        },
      });

      return res.send({ results: results });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id, name, cost, qty, categoryId } = req.body;

      await prisma.product.update({
        data: {
          name,
          cost,
          qty,
          categoryId,
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
  removeProduct: async (req, res) => {
    try {
      await prisma.product.delete({
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
