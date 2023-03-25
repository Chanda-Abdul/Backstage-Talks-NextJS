import Link from 'next/link';
import CoversPage from '@/pages/covers';
import { Cover } from '../interfaces';

type CoversProps = {
  covers: Cover[];
};

export default function CoversComponent({ covers }: CoversProps) {
  return (
    <>
      <CoversPage />
    </>
  );
}
