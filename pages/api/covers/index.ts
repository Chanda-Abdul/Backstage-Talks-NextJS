import { NextApiResponse, NextApiRequest } from 'next'
import { covers } from '../../../data'
import { Cover } from '../../../interfaces'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Cover[]>
) {
//  console.log("covers api", covers);
  return res.status(200).json(covers)
}
