import { Note } from "~/server/notes";
import Link from "next/link";

export function NoteLinkButton(props: { note: Note; key: number }) {
  const note = props.note;
  return (
    <li>
      <Link href={`/notes/${note.id}`}>{note.title}</Link>
    </li>
  );
}
