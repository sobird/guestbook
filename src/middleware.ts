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
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://medium.com/sopra-steria-norge/how-to-write-actual-api-middleware-for-next-js-2a38355f6674
 * 
 * sobird<i@sobird.me> at 2021/11/10 11:43:57 created.
 */

import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, fetchEvent: NextFetchEvent) {
  const response = NextResponse.next();
  // console.log('response', request)

  // return NextResponse.next({
  //   request: {
  //     test: 123,
  //   },
  // })

  if (request.nextUrl.pathname.startsWith('/api')) {
    //return NextResponse.rewrite(new URL('/about-2', request.url))

    return response;
  }
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/:path*',
// }