import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Über uns",
};

export default function Page() {
  return <ComingSoon title="Über uns" />;
}
