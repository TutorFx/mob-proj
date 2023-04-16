/*
  Warnings:

  - You are about to drop the `wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wallet" DROP CONSTRAINT "wallet_businessId_fkey";

-- DropForeignKey
ALTER TABLE "wallet" DROP CONSTRAINT "wallet_userId_fkey";

-- DropTable
DROP TABLE "wallet";

-- CreateTable
CREATE TABLE "transaction" (
    "amount" DOUBLE PRECISION NOT NULL,
    "businessId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("businessId","userId")
);

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
