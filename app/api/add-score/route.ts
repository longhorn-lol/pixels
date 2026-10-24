import { sql } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { username, time } = body ?? {};

  if (
    typeof username !== "string" ||
    !username.trim() ||
    !Number.isSafeInteger(time) ||
    time <= 0
  ) {
    return NextResponse.json(
      { message: "A username and a positive time in milliseconds are required." },
      { status: 400 }
    );
  }

  try {
    await sql`
      INSERT INTO public.scores (username, time)
      VALUES (${username.trim()}, ${time})
    `;
  } catch (error) {
    console.error("[leaderboard] DB error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Score added successfully." },
    { status: 200 }
  );
}
