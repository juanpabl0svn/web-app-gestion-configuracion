import { NextRequest, NextResponse } from "next/server";
import { USERS } from "../../database";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token || token == null) {
    return NextResponse.json({ message: "No token" }, { status: 400 });
  }

  const user = USERS.find((user) => user.username === token);

  if (!user) {
    return NextResponse.json({ message: "No user" }, { status: 400 });
  }

  return NextResponse.json(user, { status: 200 });
}
