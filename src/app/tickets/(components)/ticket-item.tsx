"use client";
import { CalendarIcon, MapPin, Sofa } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

import logo from "@/../public/logo.svg";
import Container from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import { H1, H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Movie, Ticket } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function fetchTickets() {
  const res = await fetch("/api/tickets", {
    method: "GET",
  });
  const data: { result: Ticket[] } = await res.json();
  return data.result;
}

export default function TicketItem({
  tickets,
  movies,
}: {
  tickets: Ticket[];
  movies: Movie[];
}) {
  const { data: user } = useSession();
  const { data, isLoading, isError } = useQuery<Ticket[], Error>({
    queryKey: ["tickets"],
    queryFn: async () => fetchTickets(),
    initialData: tickets,
  });
  const userTicketsData = data
    .filter((ticket) => ticket.userEmail === user?.user.email)
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
  const [filteredData, setFilteredData] =
    React.useState<Ticket[]>(userTicketsData);
  const [date, setDate] = React.useState<Date>();
  const [searchForm, setSearchForm] = React.useState({
    dateSelected: "",
    movie: "",
  });

  const handleDateChange = (date: Date) => {
    setDate(date as Date);
    setSearchForm({
      ...searchForm,
      dateSelected: moment(date).format("LL"),
    });
  };

  useEffect(() => {
    if (searchForm.dateSelected === "" || date === undefined) {
      const filteredTickets = userTicketsData.filter((ticket) => {
        return ticket.movieTitle
          .toLowerCase()
          .includes(searchForm.movie.toLowerCase());
      });

      setFilteredData(filteredTickets);
      return;
    }
    const filteredTickets = userTicketsData.filter((ticket) => {
      const date = moment(searchForm.dateSelected).format("LL");
      return (
        ticket.movieTitle
          .toLowerCase()
          .includes(searchForm.movie.toLowerCase()) &&
        ticket.date.includes(date)
      );
    });
    setFilteredData(filteredTickets);
  }, [searchForm, userTicketsData, date]);

  return (
    <>
      <Navbar />
      <Container className="flex flex-col gap-6 py-12">
        <H1>Watch History</H1>
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <Input
            placeholder="Search"
            onChange={(e) =>
              setSearchForm({ ...searchForm, movie: e.target.value })
            }
            className="w-full md:max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal md:w-[280px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? moment(date).format("LL") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => handleDateChange(date as Date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-4">
          {filteredData.map((ticket) => {
            const movie = movies.find(
              (movie) => movie.title === ticket.movieTitle
            );
            return (
              <Card
                key={ticket.id}
                className="flex w-full flex-col justify-between overflow-hidden lg:flex-row"
              >
                <div className="relative flex h-24 w-full lg:h-auto lg:w-1/2">
                  <Image
                    src={logo}
                    alt="logo"
                    width={24}
                    height={24}
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      margin: "1rem",
                      filter: "brightness(0.5)",
                    }}
                  />
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${
                      movie!.poster_url
                    }`}
                    alt={movie!.title}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 25%",
                      filter: "brightness(0.5)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card lg:bg-gradient-to-r" />
                </div>
                <div className="container z-10 flex flex-col gap-2 py-6">
                  <H2 className="border-none text-xl sm:text-3xl">
                    {ticket.movieTitle}
                  </H2>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex flex-row items-center gap-2">
                      <CalendarIcon size={16} />
                      <p className="text-sm sm:text-base">
                        {ticket.date} {ticket.time}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <MapPin size={16} />{" "}
                      <p className="text-sm sm:text-base">{ticket.theater}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      {ticket.seats.length > 0 && (
                        <>
                          <Sofa size={16} />{" "}
                          <p className="text-sm sm:text-base">
                            {ticket.seats.sort().join(", ")}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex flex-col justify-between gap-2 lg:flex-row">
                    <p className="font-semibold">
                      {ticket.seats.length === 0 ? "No order yet." : "Seat"}{" "}
                      {ticket.seats.sort().join(", ")}
                    </p>
                    <div className="flex flex-row gap-2 text-sm lg:gap-4 lg:text-base">
                      <p>{ticket.seats.length} x</p>
                      <p>IDR {movie!.ticket_price}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex w-full flex-col items-start justify-end gap-4 lg:flex-row lg:items-center">
                    <p>
                      Total:{" "}
                      <span className="font-semibold text-primary">
                        IDR {ticket.seats.length * movie!.ticket_price}
                      </span>
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}
