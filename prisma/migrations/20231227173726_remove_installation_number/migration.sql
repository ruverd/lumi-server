/*
  Warnings:

  - You are about to drop the column `installationNumber` on the `clients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "clients_installationNumber_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "installationNumber";
