"use client";
import { removeBackground } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GenerateImageState } from "@/types/actions";
import { Download, ImageIcon, Layers } from "lucide-react";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../loading-spinner";
import { toast } from "@/hooks/use-toast";
import { SignInButton, useUser } from "@clerk/nextjs";

const initialState: GenerateImageState = {
  status: "idle",
};
const BackgroundRemover = () => {
  const { isSignedIn } = useUser();
  // useActionStateはペンディング状態も取得することができる・・・第三の引数
  const [state, formAction, pending] = useActionState(
    removeBackground,
    initialState
  );

  const handleDownload = () => {
    if (!state.processedImage) {
      return;
    }
    try {
      const base64Data = state.processedImage.split(",")[1];
      const blob = new Blob([Buffer.from(base64Data, "base64")], {
        type: "image/png",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${state.processedImage}.png`;

      document.body.appendChild(link);
      link.click();

      //一時的なリンクを破棄（メモリリークを防ぐ）
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "ダウンロード完了",
        description: "背景の削除が完了しました。",
      });
    } catch (error) {
      console.log("Download error:", error);
      toast({
        title: "エラー",
        description: "背景の削除に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="image">ファイルをアップロード</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full"
              required //入力チェック
            />
          </div>
          {/* ユーザーがログインしていなない場合のっ制御 */}
          {isSignedIn ? (
            <Button
              type="submit"
              disabled={pending}
              className={cn("w-full duration-200", pending && "bg-primary/80")}
            >
              {pending ? (
                <LoadingSpinner />
              ) : (
                <>
                  {" "}
                  <Layers className="mr-2" />
                  背景を削除
                </>
              )}
              画像を生成する
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">
                <ImageIcon className="mr-2" />
                ログインして背景を削除
              </Button>
            </SignInButton>
          )}
        </form>
      </div>
      {/* image preview */}
      {state.processedImage && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="aspect-video relative">
              <img
                src={state.processedImage}
                alt="Generated Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={handleDownload}
          >
            <Download className="mr-2" />
            ダウンロード
          </Button>
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;
