-- CreateTable
CREATE TABLE "ResetToken" (
    "token" TEXT,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResetTokenToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResetTokenToUser_AB_unique" ON "_ResetTokenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ResetTokenToUser_B_index" ON "_ResetTokenToUser"("B");

-- AddForeignKey
ALTER TABLE "_ResetTokenToUser" ADD CONSTRAINT "_ResetTokenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ResetToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResetTokenToUser" ADD CONSTRAINT "_ResetTokenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
