import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware =  (req: NextRequest, ev: NextFetchEvent) => {
  console.log(`12212`, 12212)
  NextResponse.next();
  console.log(`44444`, 44444)
}