import React from "react";

import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> { }

export const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(function H1({ className, children, ...props }, ref) {
    return <h1 {...props} ref={ref} className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>{children}</h1>
})

export const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(function H2({ className, children, ...props }, ref) {
    return <h2 {...props} ref={ref} className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0", className)}>{children}</h2>
})

export const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(function H3({ className, children, ...props }, ref) {
    return <h3 {...props} ref={ref} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>
})

export const H4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(function H4({ className, children, ...props }, ref) {
    return <h4 {...props} ref={ref} className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h4>
})

export const P = React.forwardRef<HTMLParagraphElement, TypographyProps>(function P({ className, children, ...props }, ref) {
    return <p {...props} ref={ref} className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>
})

export const Blockquote = React.forwardRef<HTMLQuoteElement, TypographyProps>(function Blockquote({ className, children, ...props }, ref) {
    return <blockquote {...props} ref={ref} className={cn("mt-6 border-l-2 pl-6 italic", className)}>{children}</blockquote>
})

export const Ul = React.forwardRef<HTMLUListElement, TypographyProps>(function Ul({ className, children, ...props }, ref) {
    return <ul {...props} ref={ref} className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>{children}</ul>
})

export const Code = React.forwardRef<HTMLElement, TypographyProps>(function Code({ className, children, ...props }, ref) {
    return <code {...props} ref={ref} className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}>{children}</code>
})

export const LeadParagraph = React.forwardRef<HTMLParagraphElement, TypographyProps>(function Lead({ className, children, ...props }, ref) {
    return <p {...props} ref={ref} className={cn("text-xl text-muted-foreground", className)}>{children}</p>
})

export const LargeParagraph = React.forwardRef<HTMLParagraphElement, TypographyProps>(function Large({ className, children, ...props }, ref) {
    return <p {...props} ref={ref} className={cn("text-lg font-semibold", className)}>{children}</p>
})

export const SmallParagraph = React.forwardRef<HTMLParagraphElement, TypographyProps>(function Small({ className, children, ...props }, ref) {
    return <p {...props} ref={ref} className={cn("text-sm font-medium leading-none", className)}>{children}</p>
})

export const MutedParagraph = React.forwardRef<HTMLParagraphElement, TypographyProps>(function Muted({ className, children, ...props }, ref) {
    return <p {...props} ref={ref} className={cn("text-sm text-muted-foreground", className)}>{children}</p>
})