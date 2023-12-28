/*
  Warnings:

  - Added the required column `fileName` to the `electricityBills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electricityBills" ADD COLUMN     "fileName" TEXT NOT NULL;
