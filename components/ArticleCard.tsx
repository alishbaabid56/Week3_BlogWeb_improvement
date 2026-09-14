
import Link from "next/link";
import type { Article } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  const articleUrl = `/articles/${article.slug}`;

  return (
    <article
      aria-labelledby={`article-title-${article.id}`}
      className="article-card group rounded-3xl border border-stone-200 bg-white p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#B42318]">
          {article.category}
        </span>

        <time
          dateTime={article.created_at}
          className="text-xs text-stone-400"
        >
          {new Date(article.created_at).toLocaleDateString()}
        </time>
      </div>

      <h3
        id={`article-title-${article.id}`}
        className="font-display text-2xl font-bold leading-tight text-stone-900 transition-colors duration-300 group-hover:text-[#B42318]"
      >
        {article.title}
      </h3>

      <p className="mt-4 line-clamp-3 text-sm leading-7 text-stone-600">
        {article.excerpt}
      </p>

      <div className="mt-7 flex items-center justify-between border-t border-stone-100 pt-5">
        <span className="text-sm font-medium text-stone-500">
          By {article.author}
        </span>

        <Link
          href={articleUrl}
          aria-label={`Read ${article.title}`}
          className="group/link inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-[#B42318] transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
        >
          Read
          <span
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

