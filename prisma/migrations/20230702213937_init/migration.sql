/*
  Warnings:

  - A unique constraint covering the columns `[businessId]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "business" DROP CONSTRAINT "business_addressId_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "businessId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "address_businessId_key" ON "address"("businessId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
