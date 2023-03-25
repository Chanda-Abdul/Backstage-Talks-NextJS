// import CoverPage from '@/pages/cover/[id]'
import Link from 'next/link'
import { Cover } from '../interfaces'

type CoverProps = {
  cover: Cover
}

export default function CoverComponent({ cover }: CoverProps) {
  return (
    <li>
      {/* <CoverPage/> */}
      <Link href="/cover/[id]" as={`/cover/${cover.id}`}>
        {cover.title}
      </Link>
    </li>
  )
}
