"use client";
import { Calendar, Loader2Icon, MapPin, Sofa } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

import logo from "@/../public/logo.svg";
import Container from "@/components/layout/container";
import { H2 } from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast/useToast";
import { buyTicket } from "@/lib/client/fetch-utils";
import { cn } from "@/lib/utils";
import { tmdbMovie } from "@/types/tmdb";
import { Movie, Ticket } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ChooseSeatForm {
  movieTitle: string;
  seat: string[];
  cinemas: string;
  date: string;
  time: string;
  userEmail: string;
  price: number;
}

export default function OrderDetails({
  movie,
  form,
  movieDetails,
  setForm,
}: {
  movie: Movie;
  form: ChooseSeatForm;
  movieDetails: tmdbMovie;
  setForm: React.Dispatch<React.SetStateAction<ChooseSeatForm>>;
}) {
  const { data, status, update } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleSubmit = async (form: ChooseSeatForm) => {
    console.log("form", form);
    toast({
      title: "Mohon Tunggu",
      description: "Kami sedang memproses pembelian Anda...",
    });
    const response = await buyTicket(form);
    if (!response) {
      toast({
        title: "We failed to process your order.",
        description: "Please try again later.",
      });
    }
    if (response) {
      setForm({ ...form, seat: [] });
      const updateStatus = update().then((newData) => {
        toast({
          title: "Berhasil",
          description: `Pembelian berhasil dilakukan. Sisa saldo Anda adalah IDR ${newData?.user.balance}`,
        });
      });
    }

    return response;
  };
  const handleBuyTicket = useMutation({
    mutationKey: ["buyTicket", form],
    mutationFn: handleSubmit,
    onSuccess: (data) => {
      queryClient.setQueryData(["tickets", movie.title], (oldData: any) => {
        console.log("oldData", oldData);
        const newData = [...oldData, data];
        console.log("newData", newData);
        return newData;
      });
    },
  });

  if (handleBuyTicket.isLoading) {
    return <Loader2Icon className="animate-spin" />;
  }

  if (handleBuyTicket.isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Container>
      <div className="flex w-full flex-col gap-2">
        <H2 className="border-none">Order details</H2>
        <Card className="flex w-full flex-col justify-between overflow-hidden lg:flex-row">
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
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              alt={movie.title}
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
            <H2 className="border-none text-xl sm:text-3xl">{movie.title}</H2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-row items-center gap-2">
                <Calendar size={16} />
                <p className="text-sm sm:text-base">
                  {form.date} {form.time}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <MapPin size={16} />{" "}
                <p className="text-sm sm:text-base">{form.cinemas}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                {form.seat.length > 0 && (
                  <>
                    <Sofa size={16} />{" "}
                    <p className="text-sm sm:text-base">
                      {form.seat.sort().join(", ")}
                    </p>
                  </>
                )}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col justify-between gap-2 lg:flex-row">
              <p className="font-semibold">
                {form.seat.length === 0 ? "No order yet." : "Seat"}{" "}
                {form.seat.sort().join(", ")}
              </p>
              <div className="flex flex-row gap-2 text-sm lg:gap-4 lg:text-base">
                <p>{form.seat.length} x</p>
                <p>IDR {movie.ticket_price}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex w-full flex-col items-start justify-end gap-4 lg:flex-row lg:items-center">
              <p>
                Total:{" "}
                <span className="font-semibold text-primary">
                  IDR {form.seat.length * movie.ticket_price}
                </span>
              </p>{" "}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="mt-2 w-full lg:mt-0 lg:w-max"
                    disabled={
                      form.seat.length === 0 || status === "unauthenticated"
                    }
                  >
                    {status === "loading" && (
                      <>
                        <Loader2Icon className="mr-2 animate-spin" />
                        Loading...
                      </>
                    )}
                    {(status === "authenticated" ||
                      status === "unauthenticated") && <p>Bayar</p>}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  {!(
                    data?.user.balance! <
                    form.seat.length * movie.ticket_price
                  ) && (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Konfirmasi Pembelian
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Berikut adalah rincian pembelian tiket Anda.
                        </AlertDialogDescription>
                        <Separator />
                      </AlertDialogHeader>
                      <div className="mt-3 flex flex-col items-start justify-start gap-3">
                        <div className="flex flex-row items-center gap-3">
                          <Calendar />
                          {`${form.date} ${form.time}`}
                        </div>
                        <div className="flex flex-row items-center gap-3">
                          <MapPin />
                          {form.cinemas}
                        </div>
                        <div className="flex flex-row items-center gap-3">
                          <Sofa />
                          {form.seat.join(", ")}
                        </div>
                        <p className="mt-4">
                          Total:{" "}
                          <span className="font-semibold text-primary">
                            IDR {form.seat.length * movie.ticket_price}
                          </span>
                        </p>
                        <p>
                          Sisa saldo Anda:{" "}
                          <span className={cn(`font-semibold text-primary`)}>
                            IDR {data?.user?.balance}
                          </span>
                        </p>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button
                            variant={"outline"}
                            className="w-full sm:w-1/3"
                          >
                            Batal
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            className="w-full sm:w-2/3"
                            variant="default"
                            disabled={
                              data?.user.email === undefined ||
                              data.user.email === null
                            }
                            onClick={() => handleBuyTicket.mutate(form)}
                          >
                            Bayar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </>
                  )}

                  {data?.user.balance! <
                    form.seat.length * movie.ticket_price && (
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Saldo Anda Tidak Cukup
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Sisa saldo Anda adalah IDR {data?.user.balance}. Top
                          up minimal{" "}
                          <span className="text-primary">
                            IDR{" "}
                            {form.seat.length * movie.ticket_price -
                              data?.user.balance!}
                          </span>{" "}
                          untuk menyelesaikan pembayaran.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button
                            variant={"outline"}
                            className="w-full sm:w-1/3"
                          >
                            Batal
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button className="w-full sm:w-2/3" variant="default">
                            Top Up
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </>
                  )}
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
