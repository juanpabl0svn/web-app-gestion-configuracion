import { NextRequest, NextResponse } from "next/server";
import { actualizarUsers, obtenerUser } from "../database.service";

export async function POST(req: NextRequest) {
  const { username, list } = await req.json();

  if (username == null || list == null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user = await obtenerUser(username);

  if (user == null) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }


  actualizarUsers(username, { ...user, list });

  return NextResponse.json({ message: "List updated" });
}
