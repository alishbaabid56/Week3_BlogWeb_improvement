
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-stone-200 bg-white"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-100/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl justify-center px-6 py-24 text-center sm:py-32">
        <div className="w-full max-w-4xl animate-fade-up motion-safe:animate-fade-up">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B42318]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#B42318]"
            />
            Developer Blog
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-display text-5xl font-bold leading-tight tracking-tight text-stone-950 sm:text-6xl lg:text-8xl"
          >
            Learn.{" "}
            <span className="text-[#B42318]">Build.</span>{" "}
            Share.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
            Practical ideas, tutorials and insights about modern web
            development, React, Next.js, JavaScript, AI and technology.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#latest-articles"
              className="rounded-full bg-[#B42318] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#8F1D14] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-1"
            >
              Explore articles
            </a>

            <a
              href="/categories"
              className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-800 transition-all duration-300 hover:border-stone-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-1"
            >
              Browse categories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

