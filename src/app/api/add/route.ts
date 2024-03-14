import { NextRequest, NextResponse } from "next/server";
import { USERS } from "../database";

export async function POST(req: NextRequest) {
  const { username, list } = await req.json();

  if (username == null || list == null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const index = USERS.findIndex((user) => user.username === username);

  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

    USERS[index].list = list;

    return NextResponse.json({ message: "List updated" });
}
