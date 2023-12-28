/*
  Warnings:

  - You are about to alter the column `billTotalAmount` on the `electricityBills` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `electricityAmount` on the `electricityBills` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `netMeteringAmount` on the `electricityBills` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `municipalLightingTax` on the `electricityBills` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `netMeteredAmount` on the `electricityBills` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "electricityBills" ALTER COLUMN "billTotalAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "electricityAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "netMeteringAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "municipalLightingTax" SET DATA TYPE INTEGER,
ALTER COLUMN "netMeteredAmount" SET DATA TYPE INTEGER;
