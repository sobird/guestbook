/**
 * Execution Order
 * Middleware will run from the top down
 *
 * sobird<i@sobird.me> at 2021/11/12 18:42:37 created.
 */

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  
  // Add the user token to the response
  console.log("122", req.ua);

  //return new Response(JSON.stringify(req.cookies))
}
