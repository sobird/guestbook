import { getSortedPostsData } from '../../lib/posts'

export default (req, res) => {
  const allPostsData = getSortedPostsData()

  // mock request
  setTimeout(() => {
    res.json(allPostsData)
  }, 1000);
}