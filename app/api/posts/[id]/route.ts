import prisma from "@/lib/prismaDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication error. Please sign in.",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const { title, content, links, selectedCategory, imageUrl, publicId } =
      await req.json();
    const id = params.id;

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        catName: selectedCategory,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication error. Please sign in.",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const id = params.id;

    const post = await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete post" },
      { status: 500 }
    );
  }
}
