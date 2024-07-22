export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="m-8 w-full"></div> {/* TODO: Replace with navbar */}
      <section>{children}</section>
    </>
  );
}
