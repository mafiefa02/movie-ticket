/*
  Warnings:

  - You are about to drop the column `seatNumber` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `showtimeId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Showtime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theater` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToShowtime` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieTitle` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theater` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_theaterId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_showtimeId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToShowtime" DROP CONSTRAINT "_MovieToShowtime_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToShowtime" DROP CONSTRAINT "_MovieToShowtime_B_fkey";

-- DropIndex
DROP INDEX "Movie_title_release_date_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "seatNumber",
DROP COLUMN "showtimeId",
DROP COLUMN "userId",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "movieTitle" TEXT NOT NULL,
ADD COLUMN     "seats" TEXT[],
ADD COLUMN     "theater" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- DropTable
DROP TABLE "Showtime";

-- DropTable
DROP TABLE "Theater";

-- DropTable
DROP TABLE "_MovieToShowtime";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_movieTitle_fkey" FOREIGN KEY ("movieTitle") REFERENCES "Movie"("title") ON DELETE CASCADE ON UPDATE CASCADE;
