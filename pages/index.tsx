import Head from 'next/head';
import useSWR from 'swr';
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import { Cover } from '@/interfaces';
import CoverComponent from '@/components/Cover';
import Layout from '@/components/Layout';
import CoversComponent from '@/components/Covers';

// const inter = Inter({ subsets: ['latin'] })

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<Cover[]>('/api/covers', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
console.log('index- data' , data)
  return (
    <>
      <Head>
        <title>Backstage Talks | Magazine Archive</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
      <CoversComponent covers={data}/> 
     
      </Layout>
  </>
  );
}
