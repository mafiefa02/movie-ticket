import React from "react";

import { Toggle } from "@/components/ui/toggle";

const RightColumn = () => {
  const seats = [];
  let rowsIndex = 0;
  const rows = ["A", "B", "C", "D", "E"];
  let seatNumber = 9;
  for (let i = 1; i <= 3; i++) {
    if (i % 3 === 0) {
      seats.push(`${rows[rowsIndex]}${seatNumber}`);
      i = 1;
      rowsIndex += 1;
      seatNumber += 9;
    }

    if (seatNumber > 63) return seats;
    seats.push(`${rows[rowsIndex]}${seatNumber}`);
    seatNumber += 1;
  }

  return seats;
};

const LeftColumn = () => {
  const seats = [];
  let rowsIndex = 0;
  const rows = ["A", "B", "C", "D", "E"];
  let seatNumber = 1;
  for (let i = 1; i <= 3; i++) {
    if (i % 3 === 0) {
      seats.push(`${rows[rowsIndex]}${seatNumber}`);
      i = 1;
      rowsIndex += 1;
      seatNumber += 9;
    }

    if (seatNumber > 55) return seats;
    seats.push(`${rows[rowsIndex]}${seatNumber}`);
    seatNumber += 1;
  }

  return seats;
};

const MiddleColumn = () => {
  const seats = [];
  let rowsIndex = 0;
  const rows = ["A", "B", "C", "D", "E", "F"];
  let seatNumber = 4;
  for (let i = 1; i <= 5; i++) {
    if (i % 5 === 0) {
      seats.push(`${rows[rowsIndex]}${seatNumber}`);
      i = 1;
      rowsIndex += 1;
      if (seatNumber === 52) {
        seatNumber += 4;
        seats.push(`${rows[rowsIndex]}${seatNumber}`);
        for (let j = 0; j <= 6; j++) {
          seatNumber += 1;
          seats.push(`${rows[rowsIndex]}${seatNumber}`);
          j += 1;
          if (seatNumber >= 60) return seats;
        }
      }
      seatNumber += 7;
    }

    if (seatNumber > 60) return seats;
    seats.push(`${rows[rowsIndex]}${seatNumber}`);
    seatNumber += 1;
  }

  return seats;
};

interface ChooseSeatsProps {
  chooseSeats: (seat: string) => void;
}

export default function SeatMaps({ chooseSeats }: ChooseSeatsProps) {
  return (
    <>
      <div className="h-max w-full min-w-[1000px] rounded-md bg-foreground px-8 py-3 text-center text-background">
        Screen
      </div>
      <div className="flex w-full min-w-[1000px] flex-row items-start justify-center gap-20">
        <div className="grid grid-cols-3 gap-5">
          {LeftColumn().map((seat) => {
            return (
              <Toggle
                onClick={() => chooseSeats(seat)}
                variant={"outline"}
                key={seat}
                className="flex h-14 w-14 items-center justify-center rounded-md bg-white text-center text-foreground hover:bg-secondary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground dark:text-background"
              >
                {seat}
              </Toggle>
            );
          })}
        </div>
        <div className="grid grid-cols-5 gap-5">
          {MiddleColumn().map((seat) => {
            return (
              <Toggle
                onClick={() => chooseSeats(seat)}
                variant={"outline"}
                key={seat}
                className="flex h-14 w-14 items-center justify-center rounded-md bg-white text-center text-foreground hover:bg-secondary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground dark:text-background"
              >
                {seat}
              </Toggle>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-5">
          {RightColumn().map((seat) => {
            return (
              <Toggle
                onClick={() => chooseSeats(seat)}
                variant={"outline"}
                key={seat}
                className="flex h-14 w-14 items-center justify-center rounded-md bg-white text-center text-foreground hover:bg-secondary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground dark:text-background"
              >
                {seat}
              </Toggle>
            );
          })}
        </div>
      </div>
    </>
  );
}
