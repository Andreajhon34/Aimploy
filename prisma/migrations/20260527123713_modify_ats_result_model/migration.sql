/*
  Warnings:

  - Added the required column `userId` to the `AtsResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AtsResult" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AtsResult" ADD CONSTRAINT "AtsResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
