import { NextRequest, NextResponse } from "next/server";
import { updateUser, getUser } from "../database.service";

export async function POST(req: NextRequest) {
  const { username, list } = await req.json();

  if (username == null || list == null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user = await getUser(username);

  if (user == null) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.list = list;

  updateUser(user);

  return NextResponse.json({ message: "List updated" });
}
