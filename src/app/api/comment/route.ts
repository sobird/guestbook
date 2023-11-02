import { NextApiRequest } from "next";
import { NextRequest } from "next/server"
import { use } from "@/lib/middleware";

// export function GET(req: NextRequest, { params }) {
//   // URL Query Parameters
//   const searchParams = req.nextUrl.searchParams
//   console.log('searchParams', req.query)
  

//   return Response.json({ data: 123 })
// }

export const GET = function test (req) {
  console.log('req', 123)
  return Response.json({ data: 123 })
}