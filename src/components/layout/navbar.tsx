"use client"

import { MenuIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import logo from "@/../public/logo.svg";
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
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/useNavbar";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import {
    NavigationMenuLinkProps,
    NavigationMenuProps
} from "@radix-ui/react-navigation-menu";

import ThemeSwitch from "../theme-switch";
import { Button, ButtonProps } from "../ui/button";
import UserAction from "../user-action";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> { }

const NavbarContainer = ({ className, children, ...props }: NavbarProps) => {
    const { scrolled } = useNavbar()
    return <div className={cn("sticky backdrop-blur-2xl bg-background/10 backdrop-contrast-75 backdrop-brightness-150 top-0 w-full transition ease-in z-50", scrolled && 'shadow-lg border-b bg-background/80 backdrop-contrast-100 backdrop-brightness-100', className)} {...props}>{children}</div>
}

const NavbarContent = ({ className, children, ...props }: NavbarProps) => {
    return <div className={cn("container py-4 flex flex-row items-center justify-between", className)} {...props}>{children}</div>
}

interface NavbarBrandProps extends ImageProps { }
const NavbarBrand = ({ className, children = null, alt, ...props }: NavbarBrandProps) => {
    return (
        <span className={cn("flex flex-row gap-4 md:w-1/4 items-center hover:cursor-pointer drop-shadow-sm", className)}>
            <Image {...props} alt={alt} />
            {children}
        </span>
    )
}

const NavbarItems = ({ className, children, ...props }: NavbarProps) => {
    return <div className={cn("flex flex-row gap-2 items-center ml-auto", className)} {...props}>{children}</div>
}

type NavbarLinkProps = LinkProps & ButtonProps & { active?: boolean }
const NavbarLink = ({ className, children, href, ...props }: NavbarLinkProps) => {
    const active = (usePathname() === href)
    return (
        <Button {...props}
            variant={"link"}
            className={
                cn("hover:cursor-pointer text-foreground",
                    active && "underline",
                    className)
            }
            asChild
        >
            <Link href={href}>{children}</Link>
        </Button>
    )
}

interface NavbarDropdownProps extends NavigationMenuProps { children: React.ReactNode, trigger: React.ReactNode }
const NavbarDropdown = ({ trigger, children, ...props }: NavbarDropdownProps) => {
    return (
        <NavigationMenu {...props}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        {trigger}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {children}
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuIndicator />
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    )
}

interface NavbarDropdownLinkProps extends NavigationMenuLinkProps { }
const NavbarDropdownLink = ({ className, children, ...props }: NavbarDropdownLinkProps) => {
    return (
        <NavigationMenuLink {...props} className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>{children}</NavigationMenuLink>
    )
}

const NavbarSideMenu = ({ className, children, ...props }: NavbarProps) => {
    return <div className={cn("flex flex-row gap-4 justify-end items-center ml-6", className)} {...props}>{children}</div>
}

export default function Navbar() {
    const { width } = useWindowDimensions()
    const isMobile = width <= 640

    return (
        <NavbarContainer>
            <NavbarContent>

                {/* Desktop Navbar */}

                {!isMobile
                    &&
                    <>
                        <NavbarBrand src={logo} alt="logo" width={32} height={32}>
                            <p className="text-lg text-primary text-left font-bold">XVI Cinema.</p>
                        </NavbarBrand>
                        <NavbarItems>
                            <NavbarLink href="/">Home</NavbarLink>
                            <NavbarLink href="/now-playing">Now Playing</NavbarLink>
                        </NavbarItems>
                        <NavbarSideMenu>
                            <ThemeSwitch />
                            <UserAction loginText="Sign In" />
                        </NavbarSideMenu>
                    </>
                }

                {/* Mobile Navbar */}

                {isMobile
                    &&
                    <>
                        <Sheet>
                            <SheetTrigger><MenuIcon /></SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>
                                        <NavbarBrand src={logo} alt="logo" width={32} height={32}>
                                            <p className="text-base text-left">XVI Cinema.</p>
                                        </NavbarBrand>
                                    </SheetTitle>
                                </SheetHeader>
                                <NavbarContent className="flex-col gap-4 px-0 items-start">
                                    <NavbarLink href="/">Home</NavbarLink>
                                    <NavbarLink href="/materi">Materi</NavbarLink>
                                    <NavbarDropdown
                                        tabIndex={0}
                                        orientation="vertical"
                                        trigger="Tentang Kami">
                                        <NavbarDropdownLink href="/#latar-belakang">Latar Belakang</NavbarDropdownLink>
                                        <NavbarDropdownLink href="/#visi-misi">Visi dan Misi</NavbarDropdownLink>
                                        <NavbarDropdownLink href="/#organogram">Organogram</NavbarDropdownLink>
                                    </NavbarDropdown>
                                    <NavbarLink href="/leaderboard">Leaderboard</NavbarLink>
                                </NavbarContent>
                            </SheetContent>
                        </Sheet>
                        <NavbarSideMenu>
                            <ThemeSwitch />
                            <UserAction loginText="Sign In" />
                        </NavbarSideMenu>
                    </>
                }

            </NavbarContent>
        </NavbarContainer>
    )
}
