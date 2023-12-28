/*
  Warnings:

  - You are about to drop the column `billNumber` on the `electricityBills` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "electricityBills_billNumber_key";

-- AlterTable
ALTER TABLE "electricityBills" DROP COLUMN "billNumber";
