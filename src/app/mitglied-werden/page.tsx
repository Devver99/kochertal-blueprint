import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Mitglied werden",
};

export default function Page() {
  return <ComingSoon title="Mitglied werden" />;
}
