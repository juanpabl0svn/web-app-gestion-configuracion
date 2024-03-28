import { NextRequest, NextResponse } from "next/server";
import { createUser, obtenerUser } from "../database.service";

export async function POST(req: NextRequest) {
  const { username, password, name } = await req.json();

  if (
    !username ||
    username == null ||
    !password ||
    password == null ||
    !name ||
    name == null
  ) {
    return NextResponse.json(
      { error: "Information not complete" },
      { status: 404 }
    );
  }

  const user = await obtenerUser(username);

  if (user) {
    return NextResponse.json({ error: "User already exists" });
  }

  const newUser = {
    name,
    username,
    password,
    list: [],
  };

  console.log(newUser);

  createUser(newUser);

  return NextResponse.json(newUser, {
    headers: { "Set-Cookie": `token-web-app=${username}; Path=/` },
  });
}
