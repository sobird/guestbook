import { NextApiRequest, NextApiResponse } from "next";

import { compose, Next } from "@/lib/middleware";

import { User } from "@/models/index";

// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
User.sync({ force: true });

const mid = function (req: NextApiRequest, res: NextApiResponse, next: Next) {
  
  next();
};

export default compose(mid, (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
});
