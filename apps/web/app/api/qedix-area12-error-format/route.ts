import { NextResponse } from "next/server";

export async function GET() {
  // Qedix Area 12.7 controlled canary:
  // This intentionally represents an error response format change.
  // Existing clients may expect:
  // { error: { code, message } }
  //
  // This route now returns:
  // { errors: [{ type, detail }], trace }
  return NextResponse.json(
    {
      errors: [
        {
          type: "AREA12_ERROR_FORMAT_CHANGED",
          detail: "The error response format changed for this canary.",
        },
      ],
      trace: "area-12-error-format-canary",
    },
    {
      status: 400,
    },
  );
}
