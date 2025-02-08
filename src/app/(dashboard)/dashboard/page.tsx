import PageContainer from "@/components/dashboard/page-container";
import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="ダッシュボード"
        description="AIを使って画像を生成しましょう"
      />

      <div className="grid gap-4">
        {/* メイン機能へのクイックアクセス */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-lg font-semibold">画像生成</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              AIを使って、あなたのイメージを画像に変換します。
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/generate">画像を生成する</Link>
            </Button>
          </div>

          {/* 追加のクイックアクセスカードをここに配置 */}
        </div>

        {/* 使用状況サマリー */}
        <div className="p-6 border rounded-lg">
          <h2 className="text-lg font-semibold">利用状況</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg bg-background">
              <p className="text-sm text-muted-foreground">今月の生成数</p>
              <p className="text-2xl font-bold">0枚</p>
            </div>
            <div className="p-4 border rounded-lg bg-background">
              <p className="text-sm text-muted-foreground">残りクレジット</p>
              <p className="text-2xl font-bold">5コイン</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
