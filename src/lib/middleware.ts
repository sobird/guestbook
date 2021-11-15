import { NextApiRequest, NextApiResponse } from "next";

export type Next = () => Promise<any>;
export type Middleware = (req: NextApiRequest, res: NextApiResponse, next: Next) => any;

export function compose(...middleware: Middleware[] | Middleware[][])  {
  middleware = middleware.flat(Infinity) as Middleware[];

  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return function (req: NextApiRequest, res: NextApiResponse, next: Next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i: number) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}