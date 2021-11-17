import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
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
    this[method](req, res);
  } else {
    res.setHeader("Allow", allow);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
