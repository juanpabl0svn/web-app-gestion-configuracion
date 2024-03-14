import { NextRequest, NextResponse } from "next/server";
import { USERS } from "../database";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || username == null || !password || password == null) {
    return NextResponse.json(
      { error: "Information not complete" },
      { status: 404 }
    );
  }
  const user = USERS.find(
    (user) => user.username === username && user.password === password
  );

  if (user == null)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user, {
    headers: { "Set-Cookie": `token-web-app=${username}; Path=/` },
  });
}
