
"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen((value) => !value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
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

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          <Link
            href="/"
            className="rounded-md text-sm font-medium text-stone-600 transition-colors hover:text-[#B42318] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
          >
            Home
          </Link>

          <Link
            href="/categories"
            className="rounded-md text-sm font-medium text-stone-600 transition-colors hover:text-[#B42318] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
          >
            Categories
          </Link>

          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="navbar-search-panel"
            className="rounded-full p-2.5 text-stone-600 transition-colors hover:bg-red-50 hover:text-[#B42318] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
          >
            {searchOpen ? (
              <X
                aria-hidden="true"
                className="h-5 w-5"
              />
            ) : (
              <Search
                aria-hidden="true"
                className="h-5 w-5"
              />
            )}
          </button>

          <Link
            href="/admin"
            className="rounded-full bg-[#B42318] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8F1D14] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="navbar-search-panel"
            className="rounded-full p-2.5 text-stone-600 transition-colors hover:bg-red-50 hover:text-[#B42318] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
          >
            {searchOpen ? (
              <X
                aria-hidden="true"
                className="h-5 w-5"
              />
            ) : (
              <Search
                aria-hidden="true"
                className="h-5 w-5"
              />
            )}
          </button>

          <Link
            href="/admin"
            className="rounded-full bg-[#B42318] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#8F1D14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <div
          id="navbar-search-panel"
          className="animate-fade-in border-t border-stone-200 bg-stone-50"
        >
          <form
            action="/search"
            method="GET"
            role="search"
            className="mx-auto flex max-w-3xl gap-3 px-6 py-5"
          >
            <label htmlFor="navbar-search" className="sr-only">
              Search articles
            </label>

            <input
              id="navbar-search"
              name="q"
              type="search"
              placeholder="Search articles..."
              autoFocus
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 shadow-sm outline-none transition focus:border-[#B42318] focus:ring-4 focus:ring-red-100"
            />

            <button
              type="submit"
              className="rounded-full bg-[#B42318] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8F1D14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

