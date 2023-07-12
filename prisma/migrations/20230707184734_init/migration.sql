-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('NEW', 'PENDING', 'DELIVERED');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'NEW';
