import { NextRequest, NextResponse } from "next/server";
import {
  deleteArticle,
  getArticleById,
  updateArticle,
} from "@/lib/articles";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid article ID.",
        },
        { status: 400 }
      );
    }

    const article = getArticleById(articleId);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("GET article error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch article.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid article ID.",
        },
        { status: 400 }
      );
    }

    const existingArticle = getArticleById(articleId);

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found.",
        },
        { status: 404 }
      );
    }

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

    updateArticle(articleId, {
      title,
      slug,
      excerpt,
      content,
      image,
      author,
      category,
    });

    return NextResponse.json({
      success: true,
      message: "Article updated successfully.",
    });
  } catch (error) {
    console.error("PUT article error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update article. Slug may already exist.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid article ID.",
        },
        { status: 400 }
      );
    }

    const existingArticle = getArticleById(articleId);

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found.",
        },
        { status: 404 }
      );
    }

    deleteArticle(articleId);

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE article error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete article.",
      },
      { status: 500 }
    );
  }
}