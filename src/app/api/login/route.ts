import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../database.service";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || username == null || !password || password == null) {
    return NextResponse.json(
      { error: "Information not complete" },
      { status: 404 }
    );
  }
  const user = await getUser(username);

  if (user == null || user.password !== password) {
    return NextResponse.json(
      { error: "Username or password incorrect" },
      { status: 404 }
    );
  }

  return NextResponse.json(user, {
    headers: { "Set-Cookie": `token-web-app=${username}; Path=/` },
  });
}
