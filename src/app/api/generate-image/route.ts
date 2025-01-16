import { NextResponse } from "next/server";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: Request) {
  const { keyword } = await req.json();
  console.log(keyword);
  try {
    //API##############################################################
    //https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1ultra/post
    //API##############################################################
    const payload = {
      //どんな画像？
      prompt: "Lighthouse on a cliff overlooking the ocean",
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
    console.log(response.data);
    return NextResponse.json(response.data);
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
