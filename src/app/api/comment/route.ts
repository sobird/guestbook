import { NextApiRequest } from "next";
import { NextRequest } from "next/server"
import { use } from "@/lib/middleware";

// export function GET(req: NextRequest, { params }) {
//   // URL Query Parameters
//   const searchParams = req.nextUrl.searchParams
//   console.log('searchParams', req.query)
  

//   return Response.json({ data: 123 })
// }

export const GET = use((req, next) => {
  console.log('next', next)
  return Response.json({ data: 12344 })

  next();
  console.log('next1', next)
}, function test (req) {
  console.log('req', 123)
  return Response.json({ data: 123 })
})