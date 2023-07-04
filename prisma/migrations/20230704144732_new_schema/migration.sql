/*
  Warnings:

  - You are about to drop the column `date` on the `Showtime` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Showtime` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateTime` to the `Showtime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theaterId` to the `Showtime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatNumber` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_movieId_fkey";

-- AlterTable
ALTER TABLE "Showtime" DROP COLUMN "date",
DROP COLUMN "movieId",
ADD COLUMN     "dateTime" TEXT NOT NULL,
ADD COLUMN     "theaterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "createdAt",
ADD COLUMN     "seatNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "Seat";

-- CreateTable
CREATE TABLE "Theater" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToShowtime" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToShowtime_AB_unique" ON "_MovieToShowtime"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToShowtime_B_index" ON "_MovieToShowtime"("B");

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToShowtime" ADD CONSTRAINT "_MovieToShowtime_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToShowtime" ADD CONSTRAINT "_MovieToShowtime_B_fkey" FOREIGN KEY ("B") REFERENCES "Showtime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
