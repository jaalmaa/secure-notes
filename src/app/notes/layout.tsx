import { Navbar } from "~/app/components/navbar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full max-h-full w-full max-w-full bg-gray-100">
      <Navbar />
      <section className="h-full w-full">{children}</section>
    </div>
  );
}
