import { Navbar } from "~/app/components/navbar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full max-h-full w-full max-w-full flex-col bg-gray-100">
      <Navbar />
      <section className="flex-grow">{children}</section>
    </div>
  );
}
