import type { NextFetchEvent, NextRequest } from "next/server";

export const middleware =  (req: NextRequest, ev: NextFetchEvent) => {
  console.log(`req`, req)

  return new Response('est')
}