"use server";

import { GenerateImageState } from "@/types/actions";

export async function generateImage(
  state: GenerateImageState, //利用なし
  formData: FormData
): Promise<GenerateImageState> {
  const keyword = formData.get("keyword");

  if (!keyword || typeof keyword !== "string") {
    return {
      status: "error",
      error: "キーワードを入力してください。",
    };
  }
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/generate-image`, {
      method: "POST",
      headers: {
        "Content-type": "application",
      },
      body: JSON.stringify({ keyword }),
    });

    const data = await response.json();

    console.log(data.imageUrl);

    return {
      status: "success",
      imageUrl: data.imageUrl,
      keyword: keyword,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "画像の生成に失敗しました。",
    };
  }
}
