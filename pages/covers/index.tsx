import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { Cover, ResponseError } from '../../interfaces';
import CoverPage from '../cover/[id]';
import Link from 'next/link';
import RootLayout from '../layout';

type CoversProps = {
  covers: Cover[];
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function CoversPage() {
  const { query } = useRouter();
  const { data, error, isLoading, isValidating } = useSWR<Cover, ResponseError>(
    () => (query ? `/api/covers` : null),
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  // console.log('COVERS', covers);
  return (
    <RootLayout>
      <div className='cover'>
        {data.map((data) => {
          return (
            <section
              key={`issue${data.id}`}
              className={`cover__section--${data.id}`}
              data-anchor={`issue${data.id}`}
              id={`issue${data.id}`}
              data-color={`var(--${data.background_color})`}
              style={{
                backgroundColor: `var(--${data.background_color})`,
              }}
            >
              <Image
                src={`/images/${data.img}`}
                alt={`Backstage talks Issue ${data.id}`}
                className='cover__image'
                width={450}
                height={450}
              />

              <div className='cover__status'>
                <h1 className='cover__status--title'>
                  Issue #{data.id}{' '}
                  {!data.available_for_purchase && <> is sold out</>}
                </h1>{' '}
                {data.available_for_purchase && (
                  <div className='cover__status--buy'>
                    {' '}
                    <Link
                      href={`${data.link_to_purchase}`}
                      target='_blank'
                      rel='noreferrer'
                      style={{
                        color: `var(--${data.link_color})`,
                      }}
                    >
                      BUY HERE
                    </Link>{' '}
                  </div>
                )}
              </div>

              <div className='cover__status--cta'>
                {data.available_for_purchase && <>or in </>}
                {!data.available_for_purchase && (
                  <>
                    If you are lucky, you may get the last pieces in <br />
                  </>
                )}
                <Link
                  href='http://backstagetalks.com/stocklist.php'
                  target='_blank'
                  rel='noreferrer'
                  style={{
                    color: `var(--${data.link_color})`,
                  }}
                >
                  selected stores
                </Link>
                .
              </div>
            </section>
          );
        })}
      </div>
    </RootLayout>
  );
}
