"use server";

import { GenerateImageState, RemoveBackgroundState } from "@/types/actions";

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

export async function removeBackground(
  state: RemoveBackgroundState, //利用なし
  formData: FormData
): Promise<RemoveBackgroundState> {
  const image = formData.get("image") as File;

  if (!image) {
    return {
      status: "error",
      error: "画像をファイルを選択してください。",
    };
  }
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/remove-background`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("画像生成に失敗しました。");
    }

    const data = await response.json();

    return {
      status: "success",
      processedImage: data.imageUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "背景の削除に失敗しました。",
    };
  }
}
