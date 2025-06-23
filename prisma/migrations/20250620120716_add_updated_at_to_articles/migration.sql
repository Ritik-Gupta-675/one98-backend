/*
  Warnings:

  - Added the required column `updatedAt` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
