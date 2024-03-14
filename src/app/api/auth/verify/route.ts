import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  return NextResponse.json({ message: "hola" }, { status: 200 });
}
