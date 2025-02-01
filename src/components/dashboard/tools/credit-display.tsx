import { getUserCredits } from "@/lib/credits";
import { currentUser } from "@clerk/nextjs/server";
import { Loader, Loader2, Lock } from "lucide-react";
import { Suspense } from "react";

async function CreditContents() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="rounded-lg border bg-background p-4">
        <div className="text-sm font-medium text-muted-foreground">
          残りクレジット
        </div>
        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
          <Lock className="size-3" />
          <span>ログインが必要です。</span>
        </div>
      </div>
    );
  }
  const credits = await getUserCredits();

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="text-sm font-medium text-muted-foreground">
        残りクレジット
      </div>
      <div className="mt-2 font-bold1">{credits}コイン</div>
    </div>
  );
}

const Creditdisplay = async () => {
  return (
    <Suspense
      fallback={
        <div className="rounded-lg border bg-background p-4">
          <div className="text-sm font-medium text-muted-foreground">
            残りクレジット
          </div>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            <span>読み込み中</span>
          </div>
        </div>
      }
    >
      <CreditContents />
    </Suspense>
  );
};

export default Creditdisplay;
