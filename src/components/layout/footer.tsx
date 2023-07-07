import { Github, Instagram, LinkedinIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 flex w-full flex-col items-center gap-3 bg-black px-12 py-6 md:flex-row md:justify-between">
      <div className="flex flex-row gap-6 md:gap-4">
        <Link href={"https://github.com/mafiefa02"}>
          <Github color="#FFF" />
        </Link>
        <Link href={"https://linkedin.com/in/mafiefa"}>
          <LinkedinIcon color="#FFF" />
        </Link>
        <Link href={"mailto:mafiefa.business@gmail.com"}>
          <MailIcon color="#FFF" />
        </Link>
        <Link href={"https://github.com/mafiefa02"}>
          <Github color="#FFF" />
        </Link>
        <Link href={"https://instagram.com/mafiefa"}>
          <Instagram color="#FFF" />
        </Link>
      </div>
      <p className="text-xs text-white md:text-base">
        &#169; {year} Afief Abdurrahman
      </p>
    </footer>
  );
}
