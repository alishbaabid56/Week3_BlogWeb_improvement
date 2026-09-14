import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/articles";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const articles = getArticlesByCategory(decodedCategory);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-100/60 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 lg:py-28">
          {/* Back */}
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B42318] transition-colors hover:text-[#8F1D14]"
          >
            ← Back to categories
          </Link>

          <div className="mt-10 animate-fade-up">
            {/* Label */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B42318]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B42318]" />
              Category
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              {decodedCategory}
              <span className="text-[#B42318]">.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Explore practical articles, tutorials, and insights from the{" "}
              {decodedCategory} category.
            </p>

            {/* Count */}
            <div className="mt-8 inline-flex rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600">
              {articles.length}{" "}
              {articles.length === 1 ? "article" : "articles"}
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
            Articles
          </p>

          <h2 className="mt-3 font-display text-3xl font-bold text-stone-950 sm:text-4xl">
            Latest from {decodedCategory}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
            Discover the latest insights and practical guides in this
            category.
          </p>
        </div>

        {/* Article Grid */}
        <div
          className={`grid gap-6 ${
            articles.length === 1
              ? "mx-auto max-w-md"
              : articles.length === 2
                ? "mx-auto max-w-4xl md:grid-cols-2"
                : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="h-full animate-fade-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}