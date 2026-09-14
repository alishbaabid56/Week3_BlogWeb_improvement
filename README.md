# DevJournal — Performance & Accessibility Upgrade

A performance, accessibility, responsive design, and SEO improvement project based on the DevJournal full-stack blog platform.

## Project Overview

DevJournal is a full-stack developer blog platform built with Next.js, TypeScript, Tailwind CSS, and SQLite.

For Week 3 — Task 2, the existing project was audited and upgraded to improve:

* Performance
* Accessibility
* Semantic HTML
* Keyboard navigation
* Responsive behavior
* Image and font loading
* Basic SEO
* Overall user experience

The project was tested before and after the improvements using Lighthouse and a production build.

---

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* SQLite
* React
* Next.js App Router
* Lighthouse

---

## Improvements Implemented

### 1. Accessibility

* Added ARIA labels and relationships where needed.
* Added visible keyboard focus states.
* Improved keyboard navigation.
* Added accessible form validation states.
* Added `aria-required`, `aria-invalid`, and `aria-describedby`.
* Added live regions for important messages.
* Improved screen-reader support.

### 2. Semantic HTML

Improved the page structure using semantic elements such as:

* `<header>`
* `<main>`
* `<nav>`
* `<section>`
* `<article>`
* `<footer>`
* `<time>`

The document language was also explicitly defined using `lang="en"`.

### 3. Keyboard Navigation

Interactive elements were updated with visible `focus-visible` states.

Keyboard users can navigate important links, buttons, navigation elements, and form controls without relying on a mouse.

### 4. Responsive Design

The interface was tested across desktop and mobile layouts.

Improvements included:

* Responsive navigation
* Flexible CTA layout
* Responsive article grid
* Mobile-friendly spacing
* Responsive footer navigation
* Better interactive element behavior on smaller screens

### 5. Reduced Motion

Animations were updated to respect users who prefer reduced motion by using motion-safe behavior where appropriate.

### 6. Image & Loading Optimization

Performance-related improvements included:

* Next.js image delivery
* Improved font loading with `display: swap`
* Reduced unnecessary animation impact
* Production build testing

### 7. SEO

Basic SEO metadata was improved using Next.js metadata configuration.

Implemented:

* Page title
* Title template
* Description
* Keywords
* Open Graph metadata
* Twitter metadata
* Robots configuration
* Semantic document structure
* Correct document language

---

## Performance Results

The project was audited before and after the improvements.

### Improvement

* Mobile Performance: **46 → 81 (+35)**
* Desktop Performance: **82 → 100 (+18)**
* Accessibility improvements implemented while maintaining **95**
* Best Practices maintained at **100**
* SEO maintained at **100**

The final audit was performed against the optimized production build rather than the development server.

---

## Testing & Validation

The following checks were completed:

* `npm run build`
* Production server testing
* Lighthouse mobile audit
* Lighthouse desktop audit
* Keyboard navigation testing
* Responsive layout testing
* Form validation testing
* Accessibility checks
* SEO validation

---

## Project Structure

```text
devjournal/
├── app/
│   ├── api/
│   ├── articles/
│   ├── categories/
│   ├── search/
│   ├── admin/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ArticleCard.tsx
│   ├── LatestArticles.tsx
│   ├── Footer.tsx
│   └── AdminArticleForm.tsx
│
├── lib/
│   └── articles.ts
│
├── public/
├── database/
├── README.md
└── report.md
```

---

## Key Files Updated

The main improvements were implemented in:

* `app/layout.tsx`
* `components/Navbar.tsx`
* `components/Hero.tsx`
* `components/ArticleCard.tsx`
* `components/LatestArticles.tsx`
* `components/Footer.tsx`
* `components/AdminArticleForm.tsx`

---

## Deliverables

This project includes:

* Working upgraded application
* Performance improvements
* Accessibility improvements
* Responsive improvements
* SEO improvements
* Lighthouse before/after results
* Testing evidence
* Project documentation
* Reflection and next-step recommendations

---

## Reflection

This task focused on improving the quality of an already working application rather than adding new features.

The audit helped identify areas where performance, accessibility, keyboard usability, responsive behavior, and semantic structure could be improved.

The final Lighthouse results show a significant improvement in performance, especially after testing the optimized production build.

Further improvements could include deeper image compression, automated accessibility testing, caching strategies, and continuous performance monitoring.

---

## Status

**Week 3 — Task 2: Completed ✅**

**Mobile Performance:** 81
**Desktop Performance:** 100
**Accessibility:** 95
**Best Practices:** 100
**SEO:** 100
