/**
 * Next.js Api Middleware
 *
 * @see https://github.com/undrash/next.js-api-middleware/blob/main/demo-api-routes/src/pages/middleware/handler.ts
 * @see https://github.com/undrash/next.js-api-middleware/blob/main/demo-route-handlers/src/app/middleware/handler.ts
 * @see https://github.com/KolbySisk/next-api-route-middleware/blob/main/src/run-middlewares.ts
 * @see https://github.com/koajs/compose/blob/master/index.js
 * @see https://www.npmjs.com/package/next-connect
 * 
 * sobird<i@sobird.me> at 2023/10/31 19:56:22 created.
 */

import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export type Next = () => Promise<any>;
export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Next
) => any;

export type AppMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Next
) => Promise<any>;

/**
 * App Router Api
 * 
 * @param middleware 
 * @returns 
 */
export const use =
  (...middleware: AppMiddleware[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    let result;

    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false;

      const next = async () => {
        nextInvoked = true;
      };

      result = await middleware[i](req, res, next);

      if (!nextInvoked) {
        break;
      }
    }

    if (result) return result;

    throw new Error("Your handler or middleware must return a NextResponse!");
  };

/**
 * Next.js API Routes
 * 
 * @param Middleware 
 * @returns 
 */
export function compose(
  ...middleware: Middleware[]
): NextApiHandler {
  for (const fn of middleware) {
    if (typeof fn !== "function") {
      throw new TypeError("Middleware must be composed of functions!");
    }
  }

  return async function (req, res) {
    // last called middleware #
    await dispatch(0);
    async function dispatch(i: number) {
      const fn = middleware[i];
      if (res.headersSent || !fn) return;

      if (!fn) {
        res.status(500).end("Middleware must be a function!");
        throw new Error("Middleware must be a function!");
      }

      await fn(req, res, async () => {
        await dispatch(i + 1);
      });
    }
  };
}


type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const restful = (methodMap: Partial<Record<Method, NextApiHandler>>) => (async (req, res) => {
  const handler = methodMap[req.method as Method];

  if(!handler) {
    res.setHeader("Allow", Object.keys(methodMap));
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return
  }

  try {
    res.status(200).json({
      code: 0,
      message: "ok",
      data: await handler(req, res),
    });
  } catch (error) {
    res.json({
      code: error.code || 500,
      message: error.message,
      data: error.data
    });
  }
}) as NextApiHandler;
