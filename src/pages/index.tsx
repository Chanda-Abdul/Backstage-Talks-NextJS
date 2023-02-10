import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import useSWR from 'swr';
import React from 'react';

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
      <main className={styles.main}>
        {/* TO-DO => move to <Cover/> */}
        {data.record.map((r) => {
          return (
            <FadeInSection key={`${r.backgroundColor}`}>
              <section
                className={`section${r.id}`}
                data-anchor={`issue${r.id}`}
                id={`issue${r.id}`}
                data-color={`var(${r.backgroundColor})`}
                style={{
                  backgroundColor: `var(${r.backgroundColor})`,
                }}
              >
                <img
                  src={r.img}
                  alt={`Backstage talks Issue ${r.id}`}
                  className='cover'
                />
                <h2>
                  Issue #{r.id} {!r.available && <> is sold out</>}
                </h2>

                {r.available && (
                  <div className='avail'>
                    <p className='avail'>
                      <a href={`${r.linkToBuy}`}>BUY HERE</a>
                    </p>
                  </div>
                )}
                <p className='avail'>
                  {r.available && <>or in </>}
                  {!r.available && (
                    <>If you are lucky, you may get the last pieces in </>
                  )}
                  <a>selected stores</a>.
                </p>
              </section>
            </FadeInSection>
          );
        })}
      </main>

      <footer className='footer'>
        <p className='description'>
          Backstage Talks is a&nbsp;magazine of&nbsp;casual, but in&nbsp;depth
          dialogues on&nbsp;design and business. Our decisions shape and
          influence this complex world—to have a&nbsp;chance to&nbsp;make the
          right ones, we need to talk.
          <h4 className='copyright'>
            <span>
              &copy; 2023{' '}
              <a href='http://milk.sk/' target='_blank'>
                Published by studio Milk
              </a>
              .{' '}
            </span>
            <span>
              Coded by <a href=''>Chanda Abdul</a>
            </span>
          </h4>
          <h5>
            <a href='/privacy-policy.php'>Privacy Policy</a>
          </h5>
        </p>
        <ul className='menu'>
          <li>
            <a className='menulink issue6' href='#issue6'>
              Issue #6
            </a>
          </li>
          <li>
            <a className='menulink issue5' href='#issue5'>
              Issue #5
            </a>
          </li>
          <li>
            <a className='menulink issue4' href='#issue4'>
              Issue #4
            </a>
          </li>
          <li>
            <a className='menulink issue3' href='#issue3'>
              Issue #3
            </a>
          </li>
          <li>
            <a className='menulink issue2' href='#issue2'>
              Issue #2
            </a>
          </li>
          <li>
            <a className='menulink issue1' href='#issue1'>
              Issue #1
            </a>
          </li>
        </ul>
        <p className='contact'>
          <a href='mailto:info@backstagetalks.com'>info@backstagetalks.com</a>
        </p>
      </footer>
    </>
  );
}
