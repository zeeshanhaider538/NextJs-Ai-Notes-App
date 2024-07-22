import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validaition/note";
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
