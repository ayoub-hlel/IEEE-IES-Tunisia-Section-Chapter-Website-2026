import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Branch Chapters | IEEE IES Tunisia Section",
  description: "Explore the IEEE IES student branch chapters across Tunisia.",
};

export default function ChaptersPage() {
  redirect("/subunits/");
}
