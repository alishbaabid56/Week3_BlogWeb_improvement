
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const articleSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(120, "Title must be less than 120 characters."),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only."
    ),

  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters.")
    .max(250, "Excerpt must be less than 250 characters."),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters."),

  image: z
    .string()
    .optional(),

  author: z
    .string()
    .min(2, "Author name must be at least 2 characters."),

  category: z
    .string()
    .min(1, "Please select a category."),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const categories = [
  "Web Development",
  "JavaScript",
  "React",
  "Next.js",
  "AI",
  "Career",
];

type AdminArticleFormProps = {
  articleId?: number;
  defaultValues?: Partial<ArticleFormData>;
};

export default function AdminArticleForm({
  articleId,
  defaultValues,
}: AdminArticleFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      author: "Alishba",
      category: "",
      ...defaultValues,
    },
  });

  async function onSubmit(data: ArticleFormData) {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch(
        articleId ? `/api/articles/${articleId}` : "/api/articles",
        {
          method: articleId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerError(
          result.message || "Something went wrong. Please try again."
        );
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);

      setServerError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
      aria-busy={isSubmitting}
    >
      {/* Server Error */}
      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      {/* Basic Information */}
      <section
        aria-labelledby="article-details-heading"
        className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
            Article Details
          </p>

          <h2
            id="article-details-heading"
            className="mt-2 font-display text-2xl font-bold text-stone-950"
          >
            Basic Information
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Add the main information about your article.
          </p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-stone-800"
            >
              Title <span aria-hidden="true" className="text-[#B42318]">*</span>
            </label>

            <input
              id="title"
              type="text"
              placeholder="e.g. Getting Started with Next.js"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              {...register("title")}
              className={`w-full rounded-2xl border bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:bg-white focus:ring-4 focus-visible:outline-none ${
                errors.title
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-stone-200 focus:border-[#B42318] focus:ring-red-100"
              }`}
            />

            {errors.title && (
              <p
                id="title-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-600"
              >
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-stone-800"
            >
              Slug <span aria-hidden="true" className="text-[#B42318]">*</span>
            </label>

            <input
              id="slug"
              type="text"
              placeholder="getting-started-with-nextjs"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={!!errors.slug}
              aria-describedby={
                errors.slug ? "slug-help slug-error" : "slug-help"
              }
              {...register("slug")}
              className={`w-full rounded-2xl border bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:bg-white focus:ring-4 focus-visible:outline-none ${
                errors.slug
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-stone-200 focus:border-[#B42318] focus:ring-red-100"
              }`}
            />

            <p
              id="slug-help"
              className="mt-2 text-xs text-stone-400"
            >
              Use lowercase letters, numbers, and hyphens.
            </p>

            {errors.slug && (
              <p
                id="slug-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-600"
              >
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Category + Author */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Category{" "}
                <span aria-hidden="true" className="text-[#B42318]">
                  *
                </span>
              </label>

              <select
                id="category"
                required
                aria-required="true"
                aria-invalid={!!errors.category}
                aria-describedby={
                  errors.category ? "category-error" : undefined
                }
                {...register("category")}
                className={`w-full rounded-2xl border bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:bg-white focus:ring-4 focus-visible:outline-none ${
                  errors.category
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-stone-200 focus:border-[#B42318] focus:ring-red-100"
                }`}
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p
                  id="category-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-red-600"
                >
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Author{" "}
                <span aria-hidden="true" className="text-[#B42318]">
                  *
                </span>
              </label>

              <input
                id="author"
                type="text"
                placeholder="Author name"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={!!errors.author}
                aria-describedby={
                  errors.author ? "author-error" : undefined
                }
                {...register("author")}
                className={`w-full rounded-2xl border bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:bg-white focus:ring-4 focus-visible:outline-none ${
                  errors.author
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-stone-200 focus:border-[#B42318] focus:ring-red-100"
                }`}
              />

              {errors.author && (
                <p
                  id="author-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-red-600"
                >
                  {errors.author.message}
                </p>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-stone-800"
            >
              Image URL
            </label>

            <input
              id="image"
              type="url"
              inputMode="url"
              placeholder="/images/article.jpg"
              autoComplete="url"
              aria-describedby="image-help"
              {...register("image")}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:border-[#B42318] focus:bg-white focus:ring-4 focus:ring-red-100 focus-visible:outline-none"
            />

            <p
              id="image-help"
              className="mt-2 text-xs text-stone-400"
            >
              Optional. You can add a local image path or image URL.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        aria-labelledby="article-content-heading"
        className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B42318]">
            Writing
          </p>

          <h2
            id="article-content-heading"
            className="mt-2 font-display text-2xl font-bold text-stone-950"
          >
            Article Content
          </h2>
        </div>

        <div className="space-y-6">
          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="mb-2 block text-sm font-semibold text-stone-800"
            >
              Excerpt{" "}
              <span aria-hidden="true" className="text-[#B42318]">
                *
              </span>
            </label>

            <textarea
              id="excerpt"
              rows={4}
              placeholder="Write a short description of your article..."
              required
              aria-required="true"
              aria-invalid={!!errors.excerpt}
              aria-describedby={
                errors.excerpt ? "excerpt-error" : undefined
              }
              {...register("excerpt")}
              className={`w-full resize-y rounded-2xl border bg-stone-50 px-4 py-3.5 text-sm leading-6 text-stone-900 outline-none transition focus:bg-white focus:ring-4 focus-visible:outline-none ${
                errors.excerpt
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-stone-200 focus:border-[#B42318] focus:ring-red-100"
              }`}
            />

            {errors.excerpt && (
              <p
                id="excerpt-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-600"
              >
                {errors.excerpt.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold text-stone-800"
            >
              Content{" "}
              <span aria-hidden="true" className="text-[#B42318]">
                *
              </span>
            </label>

            <textarea
              id="content"
              rows={14}
              placeholder="Write your article content here..."
              required
              aria-required="true"
              aria-invalid={!!errors.content}
              aria-describedby={
                errors.content ? "content-error" : undefined
              }
              {...register("content")}
              className={`w-full resize-y rounded-2xl border bg-stone-50 px-4 py-3.5 text-sm leading-7 text-stone-900 outline-none transition focus:bg-white focus:ring-4 focus-visible:outline-none ${
                errors.content
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-stone-200 focus:border-[#B42318] focus:ring-red-100"
              }`}
            />

            {errors.content && (
              <p
                id="content-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-600"
              >
                {errors.content.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          disabled={isSubmitting}
          className="rounded-full border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-stone-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="rounded-full bg-[#B42318] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : articleId
              ? "Update Article"
              : "Publish Article"}
        </button>
      </div>
    </form>
  );
}

