-- AlterTable
ALTER TABLE "business" ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
