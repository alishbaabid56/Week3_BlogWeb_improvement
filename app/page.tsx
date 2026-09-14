import Hero from "@/components/Hero";
import LatestArticles from "@/components/LatestArticles";
import { getArticles } from "@/lib/articles";

export default function Home() {
  const articles = getArticles();

  return (
    <main>
      <Hero />
      <LatestArticles articles={articles} />
    </main>
  );
}