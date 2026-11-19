import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-sign px-5 py-2.5 font-bold no-underline transition-colors";

const variants: Record<Variant, string> = {
  // Rapsgelb mit dunkler Schrift: 8.9:1
  primary: "bg-raps text-ink hover:bg-raps-dark",
  secondary: "bg-kocher text-white hover:bg-deep",
  outline:
    "border-2 border-kocher text-kocher hover:bg-kocher hover:text-white",
  "outline-light":
    "border-2 border-hell text-white hover:border-raps hover:text-raps",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
