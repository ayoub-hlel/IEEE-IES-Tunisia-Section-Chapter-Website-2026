import type { Metadata } from "next";
import { getAllAwardsByYear } from "@/lib/db";
import AwardsContent from "./AwardsContent";

export const metadata: Metadata = {
  title: "Awards | IEEE IES Tunisia Section",
  description: "Awards and recognitions offered by the IEEE IES Tunisia Section.",
};

export default function AwardsPage() {
  const awardsByYear = getAllAwardsByYear();
  return <AwardsContent awardsByYear={awardsByYear} />;
}
