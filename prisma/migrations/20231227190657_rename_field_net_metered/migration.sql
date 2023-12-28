/*
  Warnings:

  - You are about to drop the column `netMeteredKwhAmount` on the `electricityBills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "electricityBills" DROP COLUMN "netMeteredKwhAmount",
ADD COLUMN     "netMeteredAmount" INTEGER;
