import Link from "next/link";
import { getArticles } from "@/lib/articles";

export default function CategoriesPage() {
  const articles = getArticles();

  const categories = Array.from(
    new Set(articles.map((article) => article.category))
  );

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-100/60 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B42318]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B42318]" />
              Explore Topics
            </div>

            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              Browse by{" "}
              <span className="text-[#B42318]">Category.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Explore practical articles, tutorials, and insights across
              modern web development, React, Next.js, JavaScript, AI, and
              technology.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <p className="text-stone-500">No categories available yet.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
                Topics
              </p>

              <h2 className="mt-3 font-display text-3xl font-bold text-stone-950 sm:text-4xl">
                Find something interesting
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const categoryArticles = articles.filter(
                  (article) => article.category === category
                );

                return (
                  <Link
                    key={category}
                    href={`/categories/${encodeURIComponent(category)}`}
                    className="group animate-fade-up rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-xl"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl font-bold text-[#B42318] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                          {category.charAt(0)}
                        </div>

                        <h3 className="font-display text-2xl font-bold text-stone-900 transition-colors duration-300 group-hover:text-[#B42318]">
                          {category}
                        </h3>
                      </div>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-lg text-stone-400 transition-all duration-300 group-hover:border-red-200 group-hover:bg-red-50 group-hover:text-[#B42318]">
                        →
                      </span>
                    </div>

                    <p className="mt-6 border-t border-stone-100 pt-5 text-sm text-stone-500">
                      {categoryArticles.length}{" "}
                      {categoryArticles.length === 1
                        ? "article"
                        : "articles"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}