const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, cost, categoryId } = req.body;

      await prisma.product.create({
        data: {
          name,
          cost,
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
      const { serialNumber } = req.body;
      const target = req.params.product;

      const product = await prisma.product.findFirst({
        where: {
          name: target.replaceAll("-", " "),
        },
      });

      await prisma.productDetail.create({
        data: {
          serialNumber: serialNumber,
          productId: product.id,
        },
      });

      await prisma.product.update({
        data: {
          qty: {
            increment: 1,
          },
        },
        where: {
          id: product.id,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  listProduct: async (req, res) => {
    try {
      let results;

      const condition = parseInt(req.params.id);

      if (condition == 0) {
        results = await prisma.product.findMany({
          include: {
            Category: true,
          },
          orderBy: {
            id: "desc",
          },
        });
      } else {
        results = await prisma.product.findMany({
          include: {
            Category: true,
          },
          where: {
            categoryId: condition,
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
      const target = req.params.product;

      const product = await prisma.product.findFirst({
        where: {
          name: target.replaceAll("-", " "),
        },
      });

      const results = await prisma.productDetail.findMany({
        include: {
          Product: {
            include: {
              Category: true,
            },
          },
        },
        where: {
          productId: product.id,
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
  updateProductDetail: async (req, res) => {
    try {
      const { id, serialNumber } = req.body;

      await prisma.productDetail.update({
        data: {
          serialNumber,
        },
        where: {
          id,
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
  removeProductDetail: async (req, res) => {
    try {
      await prisma.productDetail.update({
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
  searchProductDetail: async (req, res) => {
    try {
      const target = req.params.product;

      const product = await prisma.product.findFirst({
        where: {
          name: target.replaceAll("-", " "),
        },
      });

      const results = await prisma.productDetail.findMany({
        include: {
          Product: {
            include: {
              Category: true,
            },
          },
        },
        where: {
          serialNumber: req.params.serialNumber,
          productId: product.id,
        },
      });

      return res.send({ results: results });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
