import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  return NextResponse.json({ message: "Wrong" }, { status: 404 });
}

export function GET() {
  console.log("hjola");
}
