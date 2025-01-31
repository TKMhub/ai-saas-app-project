"use server";

import { decrementUserCredits, getUserCredits } from "@/lib/credits";
import { GenerateImageState, RemoveBackgroundState } from "@/types/actions";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function generateImage(
  state: GenerateImageState, //利用なし
  formData: FormData
): Promise<GenerateImageState> {
  const user = await currentUser();
  //ユーザーチャック
  if (!user) {
    throw new Error("認証が必要です。");
  }

  const credits = await getUserCredits();
  //クレジットチェック
  if (credits === null || credits < 1) {
    //?以降についてはクレジット残高が足りない旨の情報を付属
    redirect("/dashboard/plan?reason=insufficient_credits");
  }
  try {
    const keyword = formData.get("keyword");

    if (!keyword || typeof keyword !== "string") {
      return {
        status: "error",
        error: "キーワードを入力してください。",
      };
    }
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-type": "application",
          },
          body: JSON.stringify({ keyword }),
        }
      );

      const data = await response.json();

      //利用時にクレジットをg減少させる
      await decrementUserCredits(user.id);
      revalidatePath("/dashboard");

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
