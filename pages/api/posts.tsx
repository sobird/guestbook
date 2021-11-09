import { NextApiRequest, NextApiResponse } from 'next'
import { getSortedPostsData } from '../../lib/posts'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const allPostsData = getSortedPostsData()

  // mock request
  setTimeout(() => {
    res.json(allPostsData)
  }, 1000);
}