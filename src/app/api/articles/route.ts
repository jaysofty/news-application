import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();

    const search = request.nextUrl.searchParams.get("search");

 const articles = await prisma.article.findMany({
  where: search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            source: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : undefined,

  orderBy: {
    publishedAt: "desc",
  },

  take: 20,
});

    return NextResponse.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error("Failed to fetch articles:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Unable to fetch articles",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, source, description, publishedAt } = body;

    // Basic validation
    if (!title || !source || !publishedAt) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, source and publishedAt are required",
        },
        { status: 400 }
      );
    }

    const publishedDate = new Date(publishedAt);

    if (Number.isNaN(publishedDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid publishedAt date",
        },
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        source: source.trim(),
        description: description?.trim() || null,
        publishedAt: publishedDate,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: article,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create article:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create article",
      },
      { status: 500 }
    );
  }
}