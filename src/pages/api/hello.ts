import { NextApiRequest, NextApiResponse } from "next";

import { compose, Next } from "@/lib/middleware";


const mid = function(req: NextApiRequest, res: NextApiResponse, next: Next) {
  console.log(`1111`, 1111)
  next()
  console.log(`2222`, 2222)
}

export default compose(mid, (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
});
