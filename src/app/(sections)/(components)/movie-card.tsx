import Image from "next/image";
import React from "react";

import { H4, P } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Movie } from "@prisma/client";

export default function MovieCard({ movie }: { movie: Movie }) {
    const { width } = useWindowDimensions()
    const isMobile = width! <= 640
    return (
        <HoverCard key={movie.title}>
            <HoverCardTrigger asChild>
                <Card className="relative w-max overflow-hidden hover:scale-105 hover:rotate-1 transition-transform hover:-translate-y-3">
                    <Badge className="absolute top-2 left-2 text-xs opacity-75">Usia {movie.age_rating}+</Badge>
                    <Image src={movie.poster_url} alt={movie.title} width={isMobile ? 200 : 300} height={isMobile ? 300 : 450} style={{ objectFit: "cover" }} placeholder="blur" blurDataURL={"process.env.BLUR_DATA_URL"} />
                </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-max h-max">
                <div className="min-w-[300px] relative">
                    <Card className="h-[200px] w-max overflow-hidden">
                        <Image src={movie.poster_url} fill alt={movie.title} style={{ objectFit: "cover", objectPosition: "0% 0%" }} />
                        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-foreground dark:from-card to-transparent" />
                        <H4 className="absolute bottom-0 text-2xl text-card dark:text-primary font-bold m-4">{movie.title}</H4>
                    </Card>
                </div>
                <div className="w-full flex flex-col gap-4 p-4 -mt-5">
                    <P className="line-clamp-3 max-w-sm">{movie.description}</P>
                    <div className="flex flex-row items-center gap-2">
                        <Button className="w-full">Nonton Sekarang</Button>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
