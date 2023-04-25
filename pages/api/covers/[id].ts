import { NextApiRequest, NextApiResponse } from 'next'
import { covers } from '../../../data'
import type { Cover, ResponseError } from '../../../interfaces'

export default function coverHandler(
  _req: NextApiRequest,

  res: NextApiResponse<Cover | ResponseError> 
) {

  const { query } = _req
  const { id } = query
  console.log("covers api", covers);
  const cover = covers.find((c) => c.id === id)
  console.log("api", cover)
  
  
  return cover
    ? res.status(200).json(cover)
    : res.status(404).json({ message: `Cover with id: ${id} not found.` })
}
