import CoverComponent from '@/components/Cover';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { Cover, ResponseError } from '../../interfaces';
// import styles from '../../styles/globals.scss'

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

  return (
    <>
      {data.map((data) => {
        return (
          <section
            className={`section${data.id}`}
            data-anchor={`issue${data.id}`}
            id={`issue${data.id}`}
            data-color={`${data.background_color}`}
            style={{
              backgroundColor: `${data.background_color}`,
            }}
          >
            <Image
              src={`/images/${data.img}`}
              alt={`Backstage talks Issue ${data.id}`}
              className='cover'
              width={450}
              height={450}
            />

            <h2>
              Issue #{data.id}{' '}
              {!data.available_for_purchase && <> is sold out</>}
            </h2>

            {data.available_for_purchase && (
              <div>
                <p className='avail'>
                  <Link
                    href={`${data.link_to_purchase}`}
                    target='_blank'
                    rel='noreferrer'
                    style={{
                      color: `${data.link_color}`,
                    }}
                  >
                    BUY HERE
                  </Link>
                </p>
              </div>
            )}
            <p className='avail'>
              {data.available_for_purchase && <>or in </>}
              {!data.available_for_purchase && (
                <>If you are lucky, you may get the last pieces in </>
              )}
              <Link
                href='http://backstagetalks.com/stocklist.php'
                target='_blank'
                rel='noreferrer'
                style={{
                  color: `${data.link_color}`,
                }}
              >
                selected stores
              </Link>
              .
            </p>
          </section>
        );
      })}
    </>
  );
}
