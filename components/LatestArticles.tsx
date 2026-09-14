
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/articles";

type LatestArticlesProps = {
  articles: Article[];
};

export default function LatestArticles({
  articles,
}: LatestArticlesProps) {
  return (
    <section
      id="latest-articles"
      aria-labelledby="latest-articles-heading"
      className="mx-auto max-w-7xl px-6 py-20 sm:py-24"
    >
      <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
            From the journal
          </p>

          <h2
            id="latest-articles-heading"
            className="font-display text-4xl font-bold text-stone-950 sm:text-5xl"
          >
            Latest Articles
          </h2>

          <p className="mt-3 max-w-xl text-stone-500">
            Fresh ideas and practical guides for developers building
            modern digital experiences.
          </p>
        </div>

        <Link
          href="/categories"
          className="inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-[#B42318] transition-colors hover:bg-red-50 hover:text-[#8F1D14] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
        >
          Browse all categories
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {articles.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center"
        >
          <p className="text-stone-500">
            No articles available yet.
          </p>
        </div>
      ) : (
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="h-full motion-safe:animate-fade-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

