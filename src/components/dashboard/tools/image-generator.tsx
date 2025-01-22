"use client";
import { generateImage } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GenerateImageState } from "@/types/actions";
import { Download, ImageIcon, Loader } from "lucide-react";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../loading-spinner";
import { toast } from "@/hooks/use-toast";

const initialState: GenerateImageState = {
  status: "idle",
};
const ImageGenerator = () => {
  // useActionStateはペンディング状態も取得することができる・・・第三の引数
  const [state, formAction, pending] = useActionState(
    generateImage,
    initialState
  );

  const handleDownload = () => {
    if (!state.imageUrl) {
      return;
    }
    try {
      const base64Data = state.imageUrl.split(",")[1];
      const blob = new Blob([Buffer.from(base64Data, "base64")], {
        type: "image/png",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${state.keyword}.png`;

      document.body.appendChild(link);
      link.click();

      //一時的なリンクを破棄（メモリリークを防ぐ）
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "ダウンロード完了",
        description: "画像のダウンロードが完了しました。",
      });
    } catch (error) {
      console.log("Download error:", error);
      toast({
        title: "エラー",
        description: "ダウンロードに失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="keyword">キーワード</Label>
            <Input
              id="keyword"
              name="keyword"
              placeholder="作成したい画像のキーワード"
              required //入力チェック
            />
          </div>
          {/* submit button　※pendingがtrueの時にボタンを押せなくする */}
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
                <ImageIcon className="mr-2" />
                画像を生成
              </>
            )}
            画像を生成する
          </Button>
        </form>
      </div>
      {/* image preview */}
      {state.imageUrl && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="aspect-video relative">
              <img
                src={state.imageUrl}
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

export default ImageGenerator;
