import type { NextApiRequest, NextApiResponse } from 'next'
import mod, {Comment } from '@/models'

console.log('Comment', Comment.findAndPagination)
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}