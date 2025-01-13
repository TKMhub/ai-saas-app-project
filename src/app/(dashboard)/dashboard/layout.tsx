import MobileNav from "@/components/dashboard/MobileNav";
import DashboadNav from "@/components/dashboard/nav";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center h-16 px-4">
          <MobileNav />
          <Link href="/">
            <h1 className="text-lg font-bold">AI Image Generator</h1>
          </Link>
        </div>
      </header>
      {/* ダッシュボード */}
      <div className="container">
        <div
          className="md:grid md:gap-6 lg:gap-10"
          style={{ gridTemplateColumns: "min-content 1fr" }}
        >
          <aside className="fixed md:sticky top-16 z-30 hidden md:block w-[220px] lg:w-[240px] border-r h-[calc(100vh-4.1rem)]">
            <div className="py-6 px-2 lg:py-8">
              <DashboadNav />
            </div>
          </aside>
          <main className="flex w-full flex-col overflow-hidden p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
