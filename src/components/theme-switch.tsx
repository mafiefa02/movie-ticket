"use client";

import { Loader2Icon, LucideProps, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ThemeSwitchProps extends LucideProps {}

const ThemeSwitch = ({ className, ...props }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader2Icon className="animate-spin" />;
  }

  return (
    <>
      {theme === "dark" ? (
        <Moon
          {...props}
          className={cn("h-6 w-6 hover:cursor-pointer", className)}
          onClick={() => setTheme("light")}
        />
      ) : (
        <Sun
          {...props}
          className={cn("h-6 w-6 hover:cursor-pointer", className)}
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
};

export default ThemeSwitch;
