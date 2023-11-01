import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default (methodMap: Partial<Record<Method, NextApiHandler>>) => (async (req, res) => {
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
      error,
    });
  }
}) as NextApiHandler;
