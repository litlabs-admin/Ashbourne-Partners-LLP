import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  const sizes = {
    narrow: "max-w-[960px]",
    default: "max-w-[1240px]",
    wide: "max-w-[1440px]",
  } as const;

  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-10", sizes[size], className)}
      {...props}
    />
  );
}
