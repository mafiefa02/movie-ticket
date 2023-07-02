/*
  Warnings:

  - Added the required column `backdrop_url` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "backdrop_url" TEXT NOT NULL;
