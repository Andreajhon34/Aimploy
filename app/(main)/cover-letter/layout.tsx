export default function CoverLetterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background min-h-screen w-full flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
