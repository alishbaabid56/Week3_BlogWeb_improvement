import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { searchArticles } from "@/lib/articles";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  const articles = query ? searchArticles(query) : [];

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

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="animate-fade-up">
            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B42318]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B42318]" />
              Search Results
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              {query ? (
                <>
                  Results for{" "}
                  <span className="text-[#B42318]">
                    "{query}"
                  </span>
                </>
              ) : (
                <>
                  Search{" "}
                  <span className="text-[#B42318]">
                    Journal.
                  </span>
                </>
              )}
            </h1>

            {/* Result count */}
            {query && (
              <p className="mt-5 text-base text-stone-500">
                {articles.length}{" "}
                {articles.length === 1 ? "article" : "articles"}{" "}
                found for your search.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        {!query ? (
          /* Empty Search */
          <div className="animate-fade-up rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center shadow-sm sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#B42318]">
              <SearchX className="h-7 w-7" />
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold text-stone-900 sm:text-3xl">
              No search query
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-stone-500">
              Use the search button in the navigation to find
              articles across the journal.
            </p>
          </div>
        ) : articles.length === 0 ? (
          /* No Results */
          <div className="animate-fade-up rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#B42318]">
              <SearchX className="h-7 w-7" />
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold text-stone-900 sm:text-3xl">
              No articles found
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-stone-500">
              We couldn't find any articles matching{" "}
              <span className="font-semibold text-stone-800">
                "{query}"
              </span>
              .
            </p>

            <p className="mt-2 text-sm text-stone-400">
              Try another keyword from the navigation search.
            </p>
          </div>
        ) : (
          /* Results List */
          <div>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
                  Articles
                </p>

                <h2 className="mt-2 font-display text-2xl font-bold text-stone-950 sm:text-3xl">
                  Search results
                </h2>
              </div>

              <span className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-500 shadow-sm">
                {articles.length}{" "}
                {articles.length === 1
                  ? "Result"
                  : "Results"}
              </span>
            </div>

            <div className="space-y-5">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="group animate-fade-up rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl sm:p-8"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#B42318]">
                      {article.category}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-stone-300" />

                    <time
                      dateTime={article.created_at}
                      className="text-xs text-stone-400"
                    >
                      {new Date(
                        article.created_at
                      ).toLocaleDateString()}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-stone-900 transition-colors duration-300 group-hover:text-[#B42318] sm:text-3xl">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-7 flex flex-col gap-4 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-stone-500">
                      By{" "}
                      <span className="font-semibold text-stone-800">
                        {article.author}
                      </span>
                    </p>

                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#B42318] transition-colors hover:text-[#8F1D14]"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}