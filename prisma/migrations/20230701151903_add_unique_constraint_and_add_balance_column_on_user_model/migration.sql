/*
  Warnings:

  - A unique constraint covering the columns `[title,release_date]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_release_date_key" ON "Movie"("title", "release_date");
