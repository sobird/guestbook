/**
 * Middleware enables you to use code over configuration.
 * This gives you full flexibility in Next.js, because you can run code before a request is completed.
 * Based on the user's incoming request, you can modify the response by rewriting, redirecting, adding headers, or even streaming HTML.
 *
 * export type Middleware = (
 *   request: NextRequest,
 *   event: NextFetchEvent
 * ) => Promise<Response | undefined> | Response | undefined
 * 
 * sobird<i@sobird.me> at 2021/11/10 11:43:57 created.
 */

import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //return new Response("Hello, world!");

  return null
}
