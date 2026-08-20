import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { title, source, description, publishedAt } = body;

    if (
      title === undefined &&
      source === undefined &&
      description === undefined &&
      publishedAt === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one field is required",
        },
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found",
        },
        { status: 404 }
      );
    }

    let parsedPublishedAt: Date | undefined;

    if (publishedAt !== undefined) {
      parsedPublishedAt = new Date(publishedAt);

      if (Number.isNaN(parsedPublishedAt.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid publishedAt date",
          },
          { status: 400 }
        );
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(title !== undefined && {
          title: title.trim(),
        }),

        ...(source !== undefined && {
          source: source.trim(),
        }),

        ...(description !== undefined && {
          description: description?.trim() || null,
        }),

        ...(parsedPublishedAt && {
          publishedAt: parsedPublishedAt,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("Failed to update article:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update article",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const {
      title,
      source,
      description,
      publishedAt,
    } = body;

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

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found",
        },
        { status: 404 }
      );
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title: title.trim(),
        source: source.trim(),
        description: description?.trim() || null,
        publishedAt: publishedDate,
      },
    });

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("Failed to replace article:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update article",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const prisma = getPrisma();

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found",
        },
        { status: 404 }
      );
    }

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: null,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete article:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete article",
      },
      { status: 500 }
    );
  }
}