import { NextResponse } from "next/server";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json(
      { error: "画像ファイルを選択してください。" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //画像の最適化
  const optimazedInput = await sharp(buffer)
    .resize(1280, 720) //サイゼ調整
    .png({ quality: 80, compressionLevel: 9 }) //圧縮レベルMax
    .toBuffer();

  try {
    const formData = new FormData();
    formData.append("image", optimazedInput, {
      filename: "image.png",
      contentType: "image/png",
    });

    formData.append("output_format", "png");

    const response = await axios.post(
      `https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
      formData,
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`API error: ${response.status}`);
    }

    //画像の最適化
    const optimazedImage = await sharp(response.data)
      .resize(1280, 720) //サイゼ調整
      .png({ quality: 80, compressionLevel: 9 }) //圧縮レベルMax
      .toBuffer();

    //Base64エンコーディング
    const base64Image = optimazedImage.toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({ imageUrl });
    //API##############################################################
  } catch (error) {
    console.error("error generate image", error);
    return NextResponse.json(
      {
        error: "Faild to generate image",
      },
      { status: 500 }
    );
  }
}
