import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  req.test = 1212;
  console.log(`12212`, req.ip)
  NextResponse.next();
  console.log(`44444`, 44444)
}