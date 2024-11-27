/*
  Warnings:

  - Added the required column `userId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SparePartDetail" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "SparePartDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsedSparePart" ADD CONSTRAINT "UsedSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "SparePart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
