/*
  Warnings:

  - You are about to drop the column `customerId` on the `ProductDetail` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_customerId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "createDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL,
ALTER COLUMN "cost" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "ProductDetail" DROP COLUMN "customerId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
