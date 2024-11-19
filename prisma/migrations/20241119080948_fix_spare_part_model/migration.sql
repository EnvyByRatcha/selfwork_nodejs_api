/*
  Warnings:

  - Added the required column `sparePartId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "sparePartId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
