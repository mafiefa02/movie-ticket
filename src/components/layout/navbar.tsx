"use client";

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
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/useNavbar";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import {
  NavigationMenuLinkProps,
  NavigationMenuProps,
} from "@radix-ui/react-navigation-menu";

import ThemeSwitch from "../theme-switch";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import UserAction from "../user-action";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavbarContainer = ({ className, children, ...props }: NavbarProps) => {
  const { scrolled } = useNavbar();
  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full bg-white/40 backdrop-blur-sm transition ease-in dark:bg-white/10 dark:backdrop-brightness-75",
        scrolled && "border-b shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const NavbarContent = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "container flex flex-row items-center justify-between py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface NavbarBrandProps extends ImageProps {}
const NavbarBrand = ({
  className,
  children = null,
  alt,
  ...props
}: NavbarBrandProps) => {
  return (
    <a
      href="/"
      className={cn(
        "flex flex-row items-center gap-4 drop-shadow-sm hover:cursor-pointer md:w-1/4",
        className
      )}
    >
      <Image {...props} alt={alt} />
      {children}
    </a>
  );
};

const NavbarItems = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn("ml-auto flex flex-row items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

type NavbarLinkProps = {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  href: string;
};
const NavbarLink = ({
  className,
  children,
  href,
  ...props
}: NavbarLinkProps) => {
  const active = usePathname() === href;
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "text-foreground drop-shadow-2xl hover:cursor-pointer",
        active && "underline",
        className
      )}
    >
      {children}
    </a>
  );
};

interface NavbarDropdownProps extends NavigationMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}
const NavbarDropdown = ({
  trigger,
  children,
  ...props
}: NavbarDropdownProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {trigger}
          </NavigationMenuTrigger>
          <NavigationMenuContent>{children}</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

interface NavbarDropdownLinkProps extends NavigationMenuLinkProps {}
const NavbarDropdownLink = ({
  className,
  children,
  ...props
}: NavbarDropdownLinkProps) => {
  return (
    <NavigationMenuLink
      {...props}
      className={cn(
        navigationMenuTriggerStyle(),
        "w-full justify-start whitespace-nowrap"
      )}
    >
      {children}
    </NavigationMenuLink>
  );
};

const NavbarSideMenu = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "ml-6 flex flex-row items-center justify-end gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default function Navbar() {
  const { width } = useWindowDimensions();

  // Server-side rendering
  if (!width)
    return (
      <NavbarContainer>
        <NavbarContent>
          <NavbarBrand src={logo} alt="logo" width={32} height={32}>
            <p className="text-left text-lg font-bold text-primary">
              XVI Cinema.
            </p>
          </NavbarBrand>
          <NavbarSideMenu>
            <UserAction loginText="Sign In" />
          </NavbarSideMenu>
        </NavbarContent>
      </NavbarContainer>
    );

  const isMobile = width <= 640;
  return (
    <NavbarContainer>
      <NavbarContent>
        {/* Desktop Navbar */}

        {!isMobile && (
          <>
            <NavbarBrand src={logo} alt="logo" width={32} height={32}>
              <p className="text-left text-lg font-bold text-primary">
                XVI Cinema.
              </p>
            </NavbarBrand>
            <NavbarItems>
              <NavbarLink href="/">Home</NavbarLink>
              <NavbarLink href="/tickets">Tickets</NavbarLink>
            </NavbarItems>
            <NavbarSideMenu>
              <ThemeSwitch />
              <UserAction loginText="Sign In" />
            </NavbarSideMenu>
          </>
        )}

        {/* Mobile Navbar */}

        {isMobile && (
          <>
            <Sheet>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>
                    <NavbarBrand src={logo} alt="logo" width={32} height={32}>
                      <p className="text-left text-base">XVI Cinema.</p>
                    </NavbarBrand>
                  </SheetTitle>
                </SheetHeader>
                <NavbarContent className="flex-col items-start gap-4 px-0">
                  <NavbarLink href="/">Home</NavbarLink>
                  <NavbarLink href="/tickets">Tickets</NavbarLink>
                </NavbarContent>
              </SheetContent>
            </Sheet>
            <NavbarSideMenu>
              <ThemeSwitch />
              <UserAction loginText="Sign In" />
            </NavbarSideMenu>
          </>
        )}
      </NavbarContent>
    </NavbarContainer>
  );
}
