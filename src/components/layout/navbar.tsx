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
import { Button, ButtonProps } from "../ui/button";
import UserAction from "../user-action";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavbarContainer = ({ className, children, ...props }: NavbarProps) => {
  const { scrolled } = useNavbar();
  return (
    <div
      className={cn(
        "bg-background/30 sticky top-0 z-50 w-full backdrop-blur-2xl backdrop-brightness-200 backdrop-contrast-75 transition ease-in dark:backdrop-brightness-75",
        scrolled &&
          "bg-background/80 border-b shadow-lg backdrop-brightness-100 backdrop-contrast-100",
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
    <span
      className={cn(
        "flex flex-row items-center gap-4 drop-shadow-sm hover:cursor-pointer md:w-1/4",
        className
      )}
    >
      <Image {...props} alt={alt} />
      {children}
    </span>
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

type NavbarLinkProps = LinkProps & ButtonProps & { active?: boolean };
const NavbarLink = ({
  className,
  children,
  href,
  ...props
}: NavbarLinkProps) => {
  const active = usePathname() === href;
  return (
    <Button
      {...props}
      variant={"link"}
      className={cn(
        "text-foreground drop-shadow-2xl hover:cursor-pointer",
        active && "underline",
        className
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
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
              <NavbarLink href="/now-playing">Now Playing</NavbarLink>
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
                  <NavbarLink href="/now-playing">Now Playing</NavbarLink>
                  <NavbarDropdown
                    tabIndex={0}
                    orientation="vertical"
                    trigger="Profile"
                  >
                    <NavbarDropdownLink href="/profile#watch-history">
                      Watch History
                    </NavbarDropdownLink>
                    <NavbarDropdownLink href="/profile#topup-history">
                      Topup History
                    </NavbarDropdownLink>
                  </NavbarDropdown>
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
