
import Link from "next/link";

const topics = [
  "React",
  "Next.js",
  "JavaScript",
  "AI",
  "Web Development",
];

export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-stone-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <h2 id="footer-heading" className="sr-only">
          DevJournal footer
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
              aria-label="DevJournal home"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B42318] text-lg font-bold text-white transition-transform duration-300 motion-safe:group-hover:rotate-6"
              >
                D
              </span>

              <span className="font-display text-2xl font-bold tracking-tight text-stone-900">
                DevJournal
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-500">
              Practical ideas, tutorials, and insights for developers
              building modern digital experiences.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-stone-900">
              Explore
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-5 flex flex-col gap-3"
            >
              <Link
                href="/"
                className="w-fit rounded-md px-1 py-0.5 text-sm text-stone-500 transition-colors hover:text-[#B42318] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
              >
                Home
              </Link>

              <Link
                href="/categories"
                className="w-fit rounded-md px-1 py-0.5 text-sm text-stone-500 transition-colors hover:text-[#B42318] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
              >
                Categories
              </Link>

              <Link
                href="/admin"
                className="w-fit rounded-md px-1 py-0.5 text-sm text-stone-500 transition-colors hover:text-[#B42318] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
              >
                Admin
              </Link>
            </nav>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-stone-900">
              Topics
            </h3>

            <nav
              aria-label="Topic navigation"
              className="mt-5 flex flex-wrap gap-2"
            >
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={`/categories/${encodeURIComponent(topic)}`}
                  className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-[#B42318] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
                >
                  {topic}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-stone-200 pt-7 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} DevJournal. All rights reserved.
          </p>

          <p>
            Built with{" "}
            <span className="font-semibold text-stone-600">
              Next.js
            </span>{" "}
            &amp;{" "}
            <span className="font-semibold text-stone-600">
              SQLite
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

