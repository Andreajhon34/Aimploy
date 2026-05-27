-- CreateTable
CREATE TABLE "AtsResult" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AtsResult_pkey" PRIMARY KEY ("id")
);
