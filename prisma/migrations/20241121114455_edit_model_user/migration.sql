/*
  Warnings:

  - You are about to drop the column `sparePartId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `SparePart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SparePart" DROP CONSTRAINT "SparePart_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "sparePartId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "SparePart";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDetail" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'used',
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
