import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("fake_newsDB");

  const { name, email, password } = body;

  // check if user already exists
  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  await db.collection("users").insertOne({
    name,
    email,
    password,
  });

  return NextResponse.json({ message: "Signup successful" });
}