import Head from 'next/head';
import useSWR from 'swr';
import { Cover } from '@/interfaces';
import CoversPage from './covers';
import RootLayout from './layout';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<Cover[]>('/api/covers', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  
  // console.log('Home page', data);
  return (
    <>
      {/* <RootLayout> */}
        <CoversPage covers={data} />
      {/* </RootLayout> */}
    </>
  );
}
