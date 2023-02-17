import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import useSWR from 'swr';
import React, { useState } from 'react';
import Cover from './cover';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });

const fetcher = (url) => fetch(url).then((res) => res.json());

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);

  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    console.log(props.children.key, isVisible);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState('--milk');
  // const getBackgroundColorData=(val) =>{
  //   console.log(val)
  //   setBackgroundColor(val)
  // }
  let { data, error } = useSWR('/api/staticdata', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  data = JSON.parse(data);

  return (
    <>
      <Head>
        <title>Backstage Talks Magazine Archive</title>
        <meta name='description' content='Backstage Talks Magazine Archive' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {' '}
        <header className='header'>
          <h1>
            {/* TO-DO => switch to <Image> */}
            <img src='/logo.png' alt='Backstage Logo' className='logo' />
          </h1>

          <p className='contact'>
            <a className='link2' href='mailto:info@backstagetalks.com'>
              info@backstagetalks.com
            </a>
          </p>
        </header>
        <div>
          {data.record.map((r) => {
            //  {{setBackgroundColor(`${r.backgroundColor}`);}}
            return <Cover key={`${r.backgroundColor}`} props={r} />;
          })}
        </div>
      </main>
      <div className="mobile"><Footer ></Footer></div>
      
    </>
  );
}
