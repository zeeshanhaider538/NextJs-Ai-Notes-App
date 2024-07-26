import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
// import { getEmbedding } from "@/lib/openai";
import { getEmbedding } from "@/lib/voyageai";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validaition/note";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const parseResult = createNoteSchema.safeParse(body);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { title, content } = parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const embedding = await getEmbeddingForNote(title, content);
    // const note = await prisma.$transaction(
    //   async (tx) => {
    //     const note = await prisma.note.create({
    //       data: {
    //         title,
    //         content,
    //         userId,
    //       },
    //     });
    //     await notesIndex.upsert([
    //       {
    //         id: note.id,
    //         values: embedding,
    //         metadata: { userId },
    //       },
    //     ]);
    //     return note;
    //   },
    //   {
    //     maxWait: 5000, // default: 2000
    //     timeout: 10000, // default: 5000
    //   },
    // );
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ errr: "Interna Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const body = await req.json();
    const parseResult = updateNoteSchema.safeParse(body);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { id, title, content } = parseResult.data;

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });
    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    return Response.json({ note: updatedNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ errr: "Interna Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json();
    const parseResult = deleteNoteSchema.safeParse(body);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { id } = parseResult.data;

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });
    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedNote = await prisma.note.delete({
      where: { id },
    });
    return Response.json({ note: deletedNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ errr: "Interna Server Error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
  return getEmbedding(title + "\n\n" + content ?? "");
}
