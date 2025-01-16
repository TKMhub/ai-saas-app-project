import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImageGenerator = () => {
  async function generateImage(formData: FormData) {
    "use server";
    const keyword = formData.get("keyword");
    try {
      await fetch(`${process.env.BASE_URL}/api/generate-image`, {
        method: "POST",
        headers: {
          "Content-type": "application",
        },
        body: JSON.stringify({ keyword }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <form action={generateImage} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="keyword">キーワード</Label>
            <Input
              id="keyword"
              name="keyword"
              placeholder="作成したい画像のキーワード"
              required //入力チェック
            />
          </div>
          {/* submit button */}
          <Button>画像を生成する</Button>
        </form>
      </div>
      {/* image preview */}
      <div></div>
    </div>
  );
};

export default ImageGenerator;
