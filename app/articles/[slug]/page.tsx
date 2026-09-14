import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function ArticleContent({ content }: { content: string }) {
  const sections = content.split("\n");

  return (
    <div className="mt-10 space-y-6">
      {sections.map((line, index) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          return <div key={index} className="h-2" />;
        }

        // Main heading
        if (trimmedLine.startsWith("# ")) {
          return (
            <h2
              key={index}
              className="font-display pt-8 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl"
            >
              {trimmedLine.replace("# ", "")}
            </h2>
          );
        }

        // Sub heading
        if (trimmedLine.startsWith("## ")) {
          return (
            <h3
              key={index}
              className="font-display pt-6 text-2xl font-bold leading-tight text-stone-900 sm:text-3xl"
            >
              {trimmedLine.replace("## ", "")}
            </h3>
          );
        }

        // Small heading
        if (trimmedLine.startsWith("### ")) {
          return (
            <h4
              key={index}
              className="pt-4 text-xl font-bold text-stone-900"
            >
              {trimmedLine.replace("### ", "")}
            </h4>
          );
        }

        // Normal paragraph
        return (
          <p
            key={index}
            className="text-lg leading-9 text-stone-700"
          >
            {trimmedLine}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-stone-50">
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B42318] transition hover:text-[#8F1D14]"
        >
          ← Back to articles
        </Link>

        <div className="mt-10 animate-fade-up">
          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#B42318]">
              {article.category}
            </span>

            <time
              dateTime={article.created_at}
              className="text-sm text-stone-400"
            >
              {new Date(article.created_at).toLocaleDateString()}
            </time>
          </div>

          {/* Article Title */}
          <h1 className="mt-7 font-display text-4xl font-bold leading-tight text-stone-950 sm:text-6xl">
            {article.title}
          </h1>

          {/* Author */}
          <div className="mt-6 text-sm text-stone-500">
            Written by{" "}
            <span className="font-semibold text-stone-900">
              {article.author}
            </span>
          </div>

          {/* Excerpt */}
          <p className="mt-8 text-xl leading-9 text-stone-600">
            {article.excerpt}
          </p>

          <div className="my-10 h-px bg-stone-200" />

          {/* Article Content */}
          <ArticleContent content={article.content} />

          {/* Back Button */}
          <div className="mt-14 border-t border-stone-200 pt-8">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#B42318] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#8F1D14]"
            >
              ← Back to articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}