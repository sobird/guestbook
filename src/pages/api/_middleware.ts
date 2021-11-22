import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  const next = NextResponse.next();

  next.cookie('api', 'api', {
    httpOnly: true,
  })
  return next;
}