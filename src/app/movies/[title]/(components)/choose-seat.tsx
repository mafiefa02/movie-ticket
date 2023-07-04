"use client";
import { MapPin } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

import Container from "@/components/layout/container";
import { H3 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdbMovie } from "@/types/tmdb";
import { Movie } from "@prisma/client";

import OrderDetails from "./order-details";
import SeatMaps from "./seat-maps";

interface ChooseSeatForm {
  movieTitle: string;
  seat: string[];
  cinemas: string;
  date: string;
  time: string;
}

export default function ChooseSeat({
  movie,
  movieDetails,
}: {
  movie: Movie;
  movieDetails: tmdbMovie;
}) {
  const [form, setForm] = useState<ChooseSeatForm>({
    movieTitle: movie.title,
    seat: [] as string[],
    cinemas: "XVI Big Cinema Jakarta",
    date: moment().format("LL"),
    time: "10.00",
  });

  const handleTimeChange = (time: string) => {
    setForm({ ...form, seat: [], time: time });
  };

  const handleSeatChange = (seat: string) => {
    if (form.seat.includes(seat)) {
      const newSeat = form.seat.filter((s) => s !== seat);
      setForm({ ...form, seat: newSeat });
    } else {
      setForm({ ...form, seat: [...form.seat, seat] });
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <>
      <Container>
        <H3 className="mb-1 mt-6 text-primary">Choose your seat</H3>
        <div className="mb-4 flex w-full flex-col gap-6 sm:gap-4 lg:flex-row lg:justify-between">
          <p className="text-3xl font-bold xl:text-4xl">
            {moment().format("dddd")} {moment().format("LL")}
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row sm:items-center sm:justify-between lg:w-max lg:justify-center">
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex flex-row items-center gap-2">
                <div className="h-4 w-4 rounded-full border bg-white" />
                <p className="text-base">Available</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary" />
                <p className="text-base">Selected</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-destructive dark:bg-red-600" />
                <p className="text-base">Unavailable</p>
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-max">
                <SelectValue
                  placeholder={
                    <div className="flex flex-row items-center gap-2">
                      <MapPin /> XVI Big Cinema Jakarta
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cinemas Near You</SelectLabel>
                  <SelectItem value="XVI Big Cinema Jakarta">
                    XVI Big Cinema Jakarta
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs defaultValue="10.00">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger
              onClick={() => handleTimeChange("10.00")}
              value="10.00"
            >
              10.00
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTimeChange("12.00")}
              value="12.00"
            >
              12.00
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTimeChange("14.00")}
              value="14.00"
            >
              14.00
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTimeChange("18.00")}
              value="18.00"
            >
              18.00
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTimeChange("21.00")}
              value="21.00"
            >
              21.00
            </TabsTrigger>
          </TabsList>
          <TabsContent value="10.00">
            <Card className="border-none bg-muted">
              <OrderDetails
                movieDetails={movieDetails}
                movie={movie}
                form={form}
              />
              <CardContent className="flex h-max flex-col items-start gap-20 overflow-x-scroll py-8">
                <SeatMaps chooseSeats={handleSeatChange} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="12.00">
            <Card className="border-none bg-muted">
              <OrderDetails
                movieDetails={movieDetails}
                movie={movie}
                form={form}
              />
              <CardContent className="flex h-max flex-col items-start gap-20 overflow-x-scroll py-8">
                <SeatMaps chooseSeats={handleSeatChange} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="14.00">
            <Card className="border-none bg-muted">
              <OrderDetails
                movieDetails={movieDetails}
                movie={movie}
                form={form}
              />
              <CardContent className="flex h-max flex-col items-start gap-20 overflow-x-scroll py-8">
                <SeatMaps chooseSeats={handleSeatChange} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="18.00">
            <Card className="border-none bg-muted">
              <OrderDetails
                movieDetails={movieDetails}
                movie={movie}
                form={form}
              />
              <CardContent className="flex h-max flex-col items-start gap-20 overflow-x-scroll py-8">
                <SeatMaps chooseSeats={handleSeatChange} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="21.00">
            <Card className="border-none bg-muted">
              <OrderDetails
                movieDetails={movieDetails}
                movie={movie}
                form={form}
              />
              <CardContent className="flex h-max flex-col items-start gap-20 overflow-x-scroll py-8">
                <SeatMaps chooseSeats={handleSeatChange} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}
