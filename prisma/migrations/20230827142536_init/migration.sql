-- DropForeignKey
ALTER TABLE "ProductOnOrder" DROP CONSTRAINT "ProductOnOrder_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductOnOrder" ADD CONSTRAINT "ProductOnOrder_id_fkey" FOREIGN KEY ("id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
