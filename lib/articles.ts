
import db from "./db";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  category: string;
  published: number;
  created_at: string;
  updated_at: string;
};

// Get all articles
export function getArticles(): Article[] {
  return db
    .prepare("SELECT * FROM articles ORDER BY created_at DESC")
    .all() as Article[];
}

// Get single article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return db
    .prepare("SELECT * FROM articles WHERE slug = ?")
    .get(slug) as Article | undefined;
}

// Get single article by ID
export function getArticleById(id: number): Article | undefined {
  return db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .get(id) as Article | undefined;
}

// Create article
export function createArticle(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  category: string;
}) {
  const statement = db.prepare(`
    INSERT INTO articles
    (title, slug, excerpt, content, image, author, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    data.title,
    data.slug,
    data.excerpt,
    data.content,
    data.image || null,
    data.author,
    data.category
  );
}

// Update article
export function updateArticle(
  id: number,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    author: string;
    category: string;
  }
) {
  const statement = db.prepare(`
    UPDATE articles
    SET
      title = ?,
      slug = ?,
      excerpt = ?,
      content = ?,
      image = ?,
      author = ?,
      category = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    data.title,
    data.slug,
    data.excerpt,
    data.content,
    data.image || null,
    data.author,
    data.category,
    id
  );
}

// Delete article
export function deleteArticle(id: number) {
  return db
    .prepare("DELETE FROM articles WHERE id = ?")
    .run(id);
}

// Search articles
export function searchArticles(query: string): Article[] {
  const searchTerm = `%${query}%`;

  return db
    .prepare(`
      SELECT * FROM articles
      WHERE title LIKE ?
         OR excerpt LIKE ?
         OR content LIKE ?
      ORDER BY created_at DESC
    `)
    .all(searchTerm, searchTerm, searchTerm) as Article[];
}

// Get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return db
    .prepare(`
      SELECT * FROM articles
      WHERE category = ?
      ORDER BY created_at DESC
    `)
    .all(category) as Article[];
}