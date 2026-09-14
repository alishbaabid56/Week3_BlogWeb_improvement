import { NextRequest, NextResponse } from "next/server";
import { createArticle, getArticles } from "@/lib/articles";

export async function GET() {
  try {
    const articles = getArticles();

    return NextResponse.json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error("GET articles error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch articles.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      image,
      author,
      category,
    } = body;

    if (
      !title ||
      !slug ||
      !excerpt ||
      !content ||
      !author ||
      !category
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be filled.",
        },
        { status: 400 }
      );
    }

    const article = createArticle({
      title,
      slug,
      excerpt,
      content,
      image,
      author,
      category,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article created successfully.",
        articleId: article.lastInsertRowid,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST article error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create article. Slug may already exist.",
      },
      { status: 500 }
    );
  }
}