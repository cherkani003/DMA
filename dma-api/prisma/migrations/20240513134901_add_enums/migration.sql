/*
  Warnings:

  - The `bloodType` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `diabetesType` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `height` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `weight` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "DiabetesType" AS ENUM ('TYPE1', 'TYPE2', 'GESTATIONAL');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bloodType",
ADD COLUMN     "bloodType" "BloodType",
DROP COLUMN "diabetesType",
ADD COLUMN     "diabetesType" "DiabetesType",
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender",
ALTER COLUMN "height" SET DATA TYPE INTEGER,
ALTER COLUMN "weight" SET DATA TYPE INTEGER;
