import { NextApiRequest, NextApiResponse } from 'next'
import { covers } from '../../../data'
import type { Cover, ResponseError } from '../../../interfaces'

export default function coverHandler(
  req: NextApiRequest,
  res: NextApiResponse<Cover | ResponseError>
) {
  const { query } = req
  const { id } = query
  const cover = covers.find((c) => c.id === id)

  return cover
    ? res.status(200).json(cover)
    : res.status(404).json({ message: `Cover with id: ${id} not found.` })
}
