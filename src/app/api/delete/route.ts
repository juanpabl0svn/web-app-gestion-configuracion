import { NextRequest, NextResponse } from "next/server";
import { getUser, updateUser } from "../database.service";

export async function POST(req: NextRequest) {
  const { username, list } = await req.json();

  if (!username || !list) {
    return NextResponse.json({ message: "No enought data" }, { status: 400 });
  }

  const userData = await getUser(username);

  if (!userData) {
    return NextResponse.json({ message: "No user found" }, { status: 400 });
  }

  userData.list = list;

  await updateUser(userData);

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
