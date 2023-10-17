-- AlterTable
ALTER TABLE "business" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;
