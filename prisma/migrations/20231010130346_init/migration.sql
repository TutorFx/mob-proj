/*
  Warnings:

  - You are about to drop the `_ResetTokenToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `ResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('PENDING', 'USED');

-- DropForeignKey
ALTER TABLE "_ResetTokenToUser" DROP CONSTRAINT "_ResetTokenToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResetTokenToUser" DROP CONSTRAINT "_ResetTokenToUser_B_fkey";

-- AlterTable
ALTER TABLE "ResetToken" ADD COLUMN     "status" "TokenStatus" NOT NULL DEFAULT 'USED',
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ResetTokenToUser";

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
