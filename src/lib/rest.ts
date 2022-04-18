import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let { method } = req;
  method = method.toUpperCase();

  const allow = [];

  for (let key in this) {
    this[key.toUpperCase()] = this[key];

    if (key !== "default") {
      allow.push(key.toUpperCase());
    }
  }

  if (typeof this[method] === "function") {
    try {
      res.json({
        code: 0,
        message: "success",
        data: await this[method](req, res),
      });
    } catch (error) {
      res.json({
        code: error.code || 1,
        message: error.message,
        error,
      });
    }
  } else {
    res.setHeader("Allow", allow);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
