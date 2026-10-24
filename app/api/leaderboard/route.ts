export const revalidate = 0;

import { sql } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = await sql`
      SELECT id, username, time, created_at
      FROM public.scores
      ORDER BY time ASC
      LIMIT 10
    `;

    return NextResponse.json({ leaderboard }, { status: 200 });
  } catch (error) {
    console.error("[leaderboard] DB error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
