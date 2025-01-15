import { NextResponse } from "next/server";

export default function POST(req: Request) {
  try {
    //
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
