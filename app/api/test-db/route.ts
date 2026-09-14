import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();

    return NextResponse.json({
      success: true,
      message: "SQLite database connected successfully!",
      tables: result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
