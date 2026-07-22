import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BestSellers } from "@/components/home/BestSellers";
import { ScrollStory } from "@/components/home/ScrollStory";
import { MissionSection } from "@/components/home/MissionSection";
import { SocialProof } from "@/components/home/SocialProof";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <ScrollStory />
      <MissionSection />
      <SocialProof />
      <NewsletterSection />
    </>
  );
}
