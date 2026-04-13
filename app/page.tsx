import HeroSection from "@/components/HeroSection";
import AwardHeroSection from "@/components/AwardHeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import LatestActivitiesSection from "@/components/LatestActivitiesSection";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 4);

  return (
    <>
      <AwardHeroSection />
      <StatsSection />
      <AboutSection />
      <LatestActivitiesSection articles={articles} />
    </>
  );
}
