const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      const { title, detail, customerCode, userId, serialNumber } = req.body;

      const customer = await prisma.customer.findFirst({
        select: {
          id,
        },
        where: {
          code: customerCode,
        },
      });

      const product = await prisma.productDetail.findFirst({
        select: {
          id,
        },
        where: {
          serialNumber: serialNumber,
        },
      });

      await prisma.assignment.create({
        data: {
          title,
          detail,
          customerId: customer.id,
          productDetailId: product.id,
          userId: parseInt(userId),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
