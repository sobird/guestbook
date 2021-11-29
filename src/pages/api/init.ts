import { NextApiRequest, NextApiResponse } from "next";
import { compose, Next } from "@/lib/middleware";
import rest from "@/lib/rest";
import sequelize from "@/models";

const mid =  (req: NextApiRequest, res: NextApiResponse, next: Next) => {
  next();
};

sequelize.sync({ force: true }).then(res => {
  // console.log(`res`, res)
});

export default compose(mid, rest.bind(module.exports));
