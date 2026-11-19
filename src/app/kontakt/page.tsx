import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function Page() {
  return <ComingSoon title="Kontakt" />;
}
