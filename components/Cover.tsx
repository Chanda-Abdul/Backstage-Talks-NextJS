import Link from 'next/link'
import { Cover } from '../interfaces'

type CoverProps = {
  cover: Cover
}

export default function CoverComponent({ cover }: CoverProps) {
  
  console.log(cover, cover.id);
  return (
    <>
      {/* <CoverPage/> */}
      <Link href={`/covers/#issue${cover.id}`} as={`/covers/#issue${cover.id}`} >
        {cover.title}
      </Link>
    </>
  )
}
