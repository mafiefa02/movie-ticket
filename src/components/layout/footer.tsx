import Link from "next/link";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex items-center justify-center bg-primary p-3">
      <Link href="https://afiefabdurrahman.vercel.app">
        <p className="font-bold text-primary-foreground">
          © {year} Afief Abdurrahman
        </p>
      </Link>
    </div>
  );
}
