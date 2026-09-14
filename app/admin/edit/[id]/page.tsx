import Link from "next/link";
import { notFound } from "next/navigation";
import AdminArticleForm from "@/components/AdminArticleForm";
import { getArticleById } from "@/lib/articles";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;
  const articleId = Number(id);

  if (Number.isNaN(articleId)) {
    notFound();
  }

  const article = getArticleById(articleId);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
          <Link
            href="/admin"
            className="text-sm font-semibold text-[#B42318] transition hover:text-[#8F1D14]"
          >
            ← Back to dashboard
          </Link>

          <div className="mt-8 animate-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
              Manage Content
            </p>

            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              Edit Article
            </h1>

            <p className="mt-3 max-w-2xl text-stone-500">
              Update the content and details of your DevJournal article.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <AdminArticleForm
          articleId={article.id}
          defaultValues={{
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.content,
            image: article.image || "",
            author: article.author,
            category: article.category,
          }}
        />
      </section>
    </main>
  );
}