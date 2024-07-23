"use client";
import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";

interface NoteProps {
  note: NoteModel;
}

export default function Note({ note }: NoteProps) {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setShowAddEditNoteDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          {/* <CardContent>{note.content ? note.content : null}</CardContent> */}
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && " (Updated)"}
          </CardDescription>
          <CardContent>
            <p className="whitespace-pre-line">{note.content}</p>
          </CardContent>
        </CardHeader>
      </Card>
      <AddEditNoteDialog
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
        noteToEdit={note}
      />
    </>
  );
}
