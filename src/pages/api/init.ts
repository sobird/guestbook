import { NextApiRequest, NextApiResponse } from "next";
import { compose, Next } from "@/lib/middleware";
import rest from "@/lib/restful";
import sequelize from "@/lib/sequelize";

const mid =  (req: NextApiRequest, res: NextApiResponse, next: Next) => {
  next();
};

sequelize.sync({ force: true }).then(res => {
  console.log(`res`, res)
});

export default compose(mid, rest.bind(module.exports));
