import { NextApiRequest, NextApiResponse } from "next";
import { compose, Next } from "@/lib/middleware";
import rest from "@/lib/rest";
import { User } from "@/models";

const mid =  (req: NextApiRequest, res: NextApiResponse, next: Next) => {
  next();
};

User.sync({ force: true });

export default compose(mid, rest.bind(module.exports));
