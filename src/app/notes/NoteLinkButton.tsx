"use client";

import { Note } from "~/server/notes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NoteLinkButton(props: { note: Note; key: number }) {
  const note = props.note;
  const isSelected = usePathname().split("/")[2] === note.id;

  return (
    <li className="my-1">
      <Link href={`/notes/${note.id}`}>
        <div
          className={`w-full rounded-md hover:bg-gray-100 p-1.5 ${
            isSelected ? "bg-gray-100" : ""
          }`}
        >
          {note.title}
        </div>
      </Link>
    </li>
  );
}
