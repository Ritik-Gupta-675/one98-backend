/*
  Warnings:

  - You are about to drop the column `authorId` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropIndex
DROP INDEX "Like_userId_articleId_key";

-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "authorId",
ALTER COLUMN "featuredImage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "articleId",
DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "articleId",
DROP COLUMN "userId";
