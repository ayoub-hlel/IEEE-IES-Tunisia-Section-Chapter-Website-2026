import type { Metadata } from "next";
import { getAllSubunits } from "@/lib/db";
import SubunitsGrid from "./SubunitsGrid";

export const metadata: Metadata = {
  title: "Subunits | IEEE IES Tunisia Section",
  description: "Explore the IEEE IES student branch chapters and subunits across Tunisia.",
};

export default function SubunitsPage() {
  const subunits = getAllSubunits();

  return <SubunitsGrid subunits={subunits} />;
}
