import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";

const notoSandsJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

//MetaデータについてはSite.tsしてきりだす
export const metadata: Metadata = {
  title: "AI Saas",
  description: "AIを使ったサービスです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSandsJP.className} antialiased`}>{children}</body>
    </html>
  );
}
