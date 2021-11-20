import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const next = NextResponse.next();

  next.cookie("sobird", "sobird", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });

  return next;
}
