import Image from "next/image";
import React from "react";

import { H4, P } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Movie } from "@prisma/client";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { width } = useWindowDimensions();
  const isMobile = width! <= 640;
  return (
    <HoverCard key={movie.title}>
      <HoverCardTrigger asChild>
        <Card className="relative w-max overflow-hidden transition-transform hover:-translate-y-3 hover:rotate-1 hover:scale-105">
          <Badge className="absolute left-2 top-2 text-xs opacity-75">
            Usia {movie.age_rating}+
          </Badge>
          <Image
            src={movie.poster_url}
            alt={movie.title}
            width={isMobile ? 200 : 300}
            height={isMobile ? 300 : 450}
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={"process.env.BLUR_DATA_URL"}
          />
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="h-max w-max">
        <div className="relative min-w-[300px]">
          <Card className="h-[200px] w-max overflow-hidden">
            <Image
              src={movie.poster_url}
              fill
              alt={movie.title}
              style={{ objectFit: "cover", objectPosition: "0% 0%" }}
            />
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-foreground to-transparent dark:from-card" />
            <H4 className="absolute bottom-0 m-4 text-2xl font-bold text-card dark:text-primary">
              {movie.title}
            </H4>
          </Card>
        </div>
        <div className="-mt-5 flex w-full flex-col gap-4 p-4">
          <P className="line-clamp-3 max-w-sm">{movie.description}</P>
          <div className="flex flex-row items-center gap-2">
            <Button className="w-full">Nonton Sekarang</Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
