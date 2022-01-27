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

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { setUserCookie } from '@/lib/jwt/auth'


export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log('req_middeware', req.body);
  // Add the user token to the response
  return setUserCookie(req, NextResponse.next())
}
