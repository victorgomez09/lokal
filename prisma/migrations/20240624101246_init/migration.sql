/*
  Warnings:

  - The primary key for the `Setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `Setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Setting_key_key";

-- AlterTable
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_pkey",
DROP COLUMN "key",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_id_key" ON "Setting"("id");
