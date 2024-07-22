import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NoteProps {
  note: NoteModel;
}

export default function Note({ note }: NoteProps) {
  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardContent>{note.content ? note.content : null}</CardContent>
        <CardFooter>
          <span>Created At :{note.createdAt.toDateString()}</span>

          <span>Updated At :{createdUpdatedAtTimestamp}</span>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
