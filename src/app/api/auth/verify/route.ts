import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../database.service";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  console.log(token)

  if (!token || token == null) {
    return NextResponse.json({ message: "No token" }, { status: 400 });
  }

  const user = await getUser(token);

  console.log(user)
  if (!user) {
    return NextResponse.json({ message: "No user" }, { status: 400 });
  }


  return NextResponse.json(user, { status: 200 });
}
