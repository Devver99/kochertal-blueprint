import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** "prose" begrenzt die Zeilenlänge für Fließtext. */
  size?: "default" | "prose";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  const width = size === "prose" ? "max-w-3xl" : "max-w-6xl";
  return (
    <Tag
      className={`mx-auto w-full ${width} px-4 sm:px-6 ${className}`}
      {...props}
    />
  );
}
