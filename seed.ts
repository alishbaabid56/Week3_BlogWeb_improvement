import db from "./lib/db";

const articles = [
  {
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt:
      "Learn how Next.js works, why developers use it, and how to build your first modern web application with routing, components, and performance in mind.",
    content: `# Getting Started with Next.js

Next.js is a powerful React framework for building modern web applications. It provides developers with many features that would otherwise require additional configuration, including file-based routing, server-side rendering, static generation, API routes, and optimized production builds.

## Why Choose Next.js?

React is an excellent library for building user interfaces, but real-world applications often need additional features such as routing, SEO support, server-side rendering, and performance optimization.

Next.js brings these features together in one framework. This makes it easier for developers to create applications that are fast, scalable, and easier to maintain.

## Creating a Next.js Project

The easiest way to start a new Next.js project is by using the create-next-app command. It creates the basic project structure and allows you to configure options such as TypeScript, Tailwind CSS, ESLint, and the App Router.

After creating the project, developers can start the development server and begin building pages and reusable components.

## Understanding the App Router

Modern Next.js applications can use the App Router to organize pages and layouts. Folders inside the app directory represent routes, while page.tsx files define the UI for those routes.

For example, an app can contain a homepage at the root route and additional pages such as /about, /blog, or /contact.

## Reusable Components

One of the most important practices in Next.js development is creating reusable components. Instead of writing the same navigation, button, card, or section multiple times, developers can create a component and reuse it throughout the application.

Reusable components make a project cleaner, easier to test, and easier to update.

## Performance and SEO

Next.js provides several features that can improve application performance and search engine visibility. Developers can use optimized images, metadata, static generation, and server-side rendering depending on the requirements of the project.

These features are especially useful for blogs, portfolios, business websites, and e-commerce applications.

## Conclusion

Next.js provides a strong foundation for modern web development. By combining React with routing, rendering strategies, optimization features, and a structured project architecture, it allows developers to build production-ready applications more efficiently.

For developers learning full-stack development, Next.js is a valuable framework to learn because it can be used for both frontend interfaces and server-side functionality.`,
    image: "/images/nextjs.jpg",
    author: "Alishba",
    category: "Next.js",
  },

  {
    title: "Understanding React Components",
    slug: "understanding-react-components",
    excerpt:
      "Learn how React components work, how props and state are used, and why reusable components are essential for building scalable interfaces.",
    content: `# Understanding React Components

React components are the building blocks of modern React applications. A component represents a reusable part of a user interface and can contain its own structure, logic, and styling.

Instead of creating an entire website inside one large file, developers can divide the interface into smaller components such as Navbar, Hero, Button, Card, Footer, and ArticleList.

## Why Components Matter

Breaking an application into components makes the code easier to understand and maintain. Each component can focus on a specific responsibility.

For example, a blog application might have an ArticleCard component responsible only for displaying an article preview. The same component can then be reused on the homepage, search page, and category pages.

## Props

Props allow data to be passed from one component to another. They make components flexible and reusable.

For example, an ArticleCard can receive an article object as a prop and display the title, category, author, and excerpt dynamically.

This means developers do not need to create a separate card component for every article.

## State

State is used when a component needs to remember information that can change over time.

Common examples include whether a mobile menu is open, the current value of a form input, or whether a user has selected a particular option.

When state changes, React updates the relevant part of the interface automatically.

## Reusable Components

Reusable components are especially important in larger applications. A consistent component system reduces duplicated code and makes it easier to maintain the visual design of an application.

For example, a single Button component can be used for forms, navigation, calls to action, and other interactive elements.

## Component-Based Architecture

A good React application usually contains many small components rather than a few very large ones.

Developers should aim to give each component a clear purpose. This improves readability and makes individual parts of the application easier to test and improve.

## Conclusion

Understanding React components is essential for becoming a strong frontend developer. Components, props, and state provide a flexible way to build interactive and reusable user interfaces.

Once these concepts are understood, developers can use them to create larger applications with cleaner architecture and better maintainability.`,
    image: "/images/react.jpg",
    author: "Alishba",
    category: "React",
  },

  {
    title: "The Future of AI in Web Development",
    slug: "future-of-ai-in-web-development",
    excerpt:
      "Explore how artificial intelligence is changing web development, from coding assistance and testing to accessibility, automation, and developer productivity.",
    content: `# The Future of AI in Web Development

Artificial intelligence is becoming an important part of modern web development. AI-powered tools are helping developers write code, understand unfamiliar projects, find bugs, generate content, and automate repetitive tasks.

## AI as a Development Assistant

One of the most common uses of AI in development is coding assistance. AI tools can help developers generate functions, explain code, suggest improvements, and provide examples.

This does not mean developers no longer need programming knowledge. Instead, developers can use AI as an assistant while still reviewing and understanding the generated code.

## Faster Prototyping

AI can significantly reduce the time required to create an initial prototype. Developers can describe a feature and use AI to generate a starting point for components, layouts, or backend logic.

This allows developers to experiment with ideas more quickly and spend more time improving the final product.

## Testing and Debugging

AI can also support software testing and debugging. Developers can ask AI tools to suggest test cases, identify potential edge cases, and explain error messages.

However, generated suggestions should always be tested because AI-generated code can contain mistakes.

## Accessibility

Another promising area is accessibility. AI can help developers identify missing alternative text, unclear labels, poor heading structures, and other potential usability issues.

Accessibility should still be reviewed by developers because automated tools cannot detect every real-world accessibility problem.

## The Role of Developers

As AI becomes more capable, the role of developers is changing. Developers need to focus not only on writing code but also on architecture, problem solving, security, user experience, testing, and making good technical decisions.

AI can generate code, but developers are responsible for deciding whether that code is appropriate for the project.

## The Future

AI will likely become an increasingly common part of development workflows. Developers who understand how to use AI responsibly can automate repetitive work while spending more time on creative and complex problems.

The strongest approach is not replacing development skills with AI. It is combining strong programming fundamentals with AI-assisted workflows.

## Conclusion

Artificial intelligence is changing how websites and applications are built. From coding assistance to testing and accessibility improvements, AI can make development faster and more productive.

However, human judgment remains essential. Developers should treat AI as a powerful assistant rather than an automatic replacement for knowledge, testing, and responsible engineering.`,
    image: "/images/ai.jpg",
    author: "Alishba",
    category: "AI",
  },
];

const updateArticle = db.prepare(`
  UPDATE articles
  SET
    excerpt = ?,
    content = ?,
    image = ?,
    updated_at = CURRENT_TIMESTAMP
  WHERE slug = ?
`);

for (const article of articles) {
  updateArticle.run(
    article.excerpt,
    article.content,
    article.image,
    article.slug
  );
}

console.log("✅ Articles updated with proper headings!");

db.close();