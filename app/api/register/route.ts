import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface RegisterProps {
  email: string;
  password: string;
  passwordAuth: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterProps;

  const { email, password, passwordAuth } = body;

  if (!email || !password || passwordAuth) {
    return NextResponse.json(
      { error: "Missing Required Fields" },
      { status: 400 }
    );
  }

  const emailReg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  if (!emailReg.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (password.length < 8 || password !== passwordAuth) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
}
