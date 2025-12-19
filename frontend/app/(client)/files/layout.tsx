import Breadcrumbs from "@/components/breadcrumbs";

export default function FilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full mt-6">
      <Breadcrumbs />
      {children}
    </div>
  );
}
