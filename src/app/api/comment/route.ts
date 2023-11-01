import { NextApiRequest } from "next";
import { NextRequest } from "next/server"

export function GET(req: NextRequest, { params }) {
  // URL Query Parameters
  const searchParams = req.nextUrl.searchParams
  console.log('searchParams', searchParams)

  req.sobird = '123'

  return Response.json({ data: req.sobird })
}