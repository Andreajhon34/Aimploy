/*
  Warnings:

  - Added the required column `resumeId` to the `AtsResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AtsResult" ADD COLUMN     "resumeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AtsResult" ADD CONSTRAINT "AtsResult_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
