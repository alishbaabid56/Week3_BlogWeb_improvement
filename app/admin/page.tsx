"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Article } from "@/lib/articles";

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadArticles() {
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();

      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("Failed to load articles:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setArticles((current) =>
          current.filter((article) => article.id !== id)
        );
      } else {
        alert(data.message || "Failed to delete article.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting the article.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-18">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="animate-fade-up">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
                Content Management
              </p>

              <h1 className="font-display text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-xl text-stone-500">
                Create, manage, edit, and remove articles from your
                DevJournal platform.
              </p>
            </div>

            <Link
              href="/admin/create"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#B42318] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8F1D14] hover:shadow-md"
            >
              <span className="text-lg leading-none">+</span>
              Create Article
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* Stats */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-stone-500">
              Total Articles
            </p>

            <p className="mt-2 font-display text-4xl font-bold text-stone-950">
              {articles.length}
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-stone-500">
              Published
            </p>

            <p className="mt-2 font-display text-4xl font-bold text-[#B42318]">
              {articles.filter((article) => article.published === 1).length}
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-stone-500">
              Categories
            </p>

            <p className="mt-2 font-display text-4xl font-bold text-stone-950">
              {new Set(articles.map((article) => article.category)).size}
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-200 px-6 py-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold text-stone-950">
              All Articles
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Manage your published content.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-[#B42318]" />

              <p className="mt-4 text-sm text-stone-500">
                Loading articles...
              </p>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-[#B42318]">
                +
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-stone-900">
                No articles yet
              </h3>

              <p className="mt-2 text-sm text-stone-500">
                Create your first article to get started.
              </p>

              <Link
                href="/admin/create"
                className="mt-6 inline-flex rounded-full bg-[#B42318] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F1D14]"
              >
                Create Article
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {articles.map((article, index) => (
                <div
                  key={article.id}
                  className="animate-fade-up flex flex-col gap-5 p-6 transition-colors hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Article Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#B42318]">
                        {article.category}
                      </span>

                      {article.published === 1 && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          Published
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-stone-900">
                      {article.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                      {article.excerpt}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-400">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <time dateTime={article.created_at}>
                        {new Date(
                          article.created_at
                        ).toLocaleDateString()}
                      </time>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      className="rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50"
                    >
                      View
                    </Link>

                    <Link
                      href={`/admin/edit/${article.id}`}
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-[#B42318] transition-all hover:bg-red-100"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(article.id)}
                      disabled={deletingId === article.id}
                      className="rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-[#B42318] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === article.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}