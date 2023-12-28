/*
  Warnings:

  - You are about to drop the column `RefMonth` on the `electricityBills` table. All the data in the column will be lost.
  - You are about to drop the column `RefYear` on the `electricityBills` table. All the data in the column will be lost.
  - Added the required column `refMonth` to the `electricityBills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refYear` to the `electricityBills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electricityBills" DROP COLUMN "RefMonth",
DROP COLUMN "RefYear",
ADD COLUMN     "refMonth" INTEGER NOT NULL,
ADD COLUMN     "refYear" INTEGER NOT NULL;
