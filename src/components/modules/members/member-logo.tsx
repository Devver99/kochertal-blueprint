import Image from "next/image";
import type { MemberView } from "@/lib/content/types";
import { initials } from "@/lib/format";

const sizes = {
  md: "size-16 text-xl",
  lg: "size-28 text-4xl sm:size-36 sm:text-5xl",
} as const;

/**
 * Logo des Betriebs – oder ein Platzhalter mit Initialen.
 * Der Platzhalter ist dekorativ, der Name steht immer daneben.
 */
export function MemberLogo({
  member,
  size = "md",
}: {
  member: MemberView;
  size?: keyof typeof sizes;
}) {
  if (member.logo) {
    return (
      <Image
        src={member.logo.src}
        alt={member.logo.alt}
        width={144}
        height={144}
        className={`${sizes[size]} shrink-0 rounded-sign border border-line bg-white object-contain p-2`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizes[size]} inline-flex shrink-0 items-center justify-center rounded-sign border border-line bg-moos font-display font-bold text-kocher`}
    >
      {initials(member.name)}
    </span>
  );
}
