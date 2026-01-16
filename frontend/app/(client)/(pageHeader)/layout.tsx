"use client";
import PageHeader from "@/components/editor/page-header";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn("px-6 pt-4 h-full ")}>
      <PageHeader />
      <section className={cn("mt-4 w-full")}>
        {/* <Breadcrumbs /> */}
        {children}
      </section>
    </main>
  );
}
