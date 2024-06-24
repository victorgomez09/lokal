-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rootDir" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
