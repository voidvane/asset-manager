import { NextResponse } from "next/server";
import { ECONOMIC_TERMS } from "@/data/terms";

export async function GET() {
  return NextResponse.json({ count: ECONOMIC_TERMS.length, terms: ECONOMIC_TERMS }, { status: 200 });
}
