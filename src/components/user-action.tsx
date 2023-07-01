"use client"

import { Loader2Icon, LogInIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, ButtonProps } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport
} from "./ui/navigation-menu";

interface UserActionProps extends ButtonProps { loginText?: string }
export default function UserAction({ className, loginText = undefined, ...props }: UserActionProps) {
    const { data, status } = useSession()

    switch (status) {
        case "authenticated":
            return (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                                <Avatar className={cn("w-9 h-9", className)} {...props}>
                                    <AvatarImage src={data.user?.image ?? undefined} />
                                    <AvatarFallback>{data.user?.name?.[0] ?? "?"}</AvatarFallback>
                                </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <Link href={"/profile"} passHref>
                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full justify-start whitespace-nowrap")}>Profile</NavigationMenuLink>
                                </Link>
                                <Link href={""} onClick={() => signOut()}>
                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full justify-start whitespace-nowrap")}>Sign Out</NavigationMenuLink>
                                </Link>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuIndicator />
                    </NavigationMenuList>
                    <NavigationMenuViewport />
                </NavigationMenu>
            )

        case "loading":
            return <Loader2Icon className={cn("animate-spin", className)} />

        case "unauthenticated":
            return (
                <Button variant="ghost" className={cn("space-x-2", className)} onClick={() => signIn()} {...props}>
                    <LogInIcon />
                    <span>{loginText}</span>
                </Button>
            )

        default:
            return null
    }
}
