"use client";

import { Hydrate as Hidrasi, HydrateProps } from "@tanstack/react-query";

export function Hydrate({ children, ...props }: HydrateProps) {
  return <Hidrasi {...props}>{children}</Hidrasi>;
}
