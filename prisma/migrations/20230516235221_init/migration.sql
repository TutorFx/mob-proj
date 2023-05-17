/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `business` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `transaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `originId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "originId" TEXT NOT NULL,
ADD CONSTRAINT "transaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "birthday" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_originId_fkey" FOREIGN KEY ("originId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
