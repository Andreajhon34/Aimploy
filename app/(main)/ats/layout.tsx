import React from "react";

export default function AtsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
