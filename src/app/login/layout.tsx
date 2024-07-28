export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full max-h-full w-full max-w-full flex-col items-center">
      {children}
    </section>
  );
}
