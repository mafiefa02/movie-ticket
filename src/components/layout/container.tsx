import React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function Container({ children, className, ...props }: ContainerProps) {
    return (
        <section className={cn("container py-4", className)} {...props}>
            {children}
        </section>
    )
}
