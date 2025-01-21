import { NextResponse } from "next/server";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";

export async function POST(req: Request) {
  const { keyword } = await req.json();

  try {
    //API##############################################################
    //https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1ultra/post
    //API##############################################################
    const payload = {
      //どんな画像？
      prompt: `Create Image with ${keyword}`,
      //画像形式は？
      output_format: "png",
    };

    const formData = new FormData();
    formData.append("prompt", payload.prompt);
    formData.append("output_format", payload.output_format);
    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
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
