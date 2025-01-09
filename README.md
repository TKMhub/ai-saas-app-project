#Next.js のインストール
npx create-next-app@latest ai-saas-app-project

#shadcn のインストール
npx shadcn@latest init
⭐️ コンポーネントを全て初回インストールする
npx shadcn@latest add --all

⭐️ フォント設定
const notoSandsJP = Noto_Sans_JP({
subsets: ["latin"],
weight: ["400", "500", "700"],
preload: true,
});

⭐️Meta データについては Site.ts して切り出してインポートする
