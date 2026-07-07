import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("public", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
