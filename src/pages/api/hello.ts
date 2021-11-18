import { NextApiRequest, NextApiResponse } from "next";

import { compose, Next } from "@/lib/middleware";

import { User } from "@/models";
import rest from "@/lib/rest";

// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true });

const user = User.build({ username: 'Jane', nickname: 'Doe' });


const mid = function (req: NextApiRequest, res: NextApiResponse, next: Next) {
  
  next();
};

export default compose(mid, rest.bind(module.exports));
