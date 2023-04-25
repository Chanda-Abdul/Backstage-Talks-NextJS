import Layout from '@/pages/layout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { Cover, ResponseError } from '../../interfaces';

const fetcher = async (url: string) => {
  // console.log('url', url)
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function CoverPage() {
  const { query } = useRouter();
  const { data, error, isLoading, isValidating } = useSWR<Cover, ResponseError>(
    () => (query.id ? `/api/covers/${query.id}` : null),
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <>
      <section
        className={`section${data.id}`}
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
            Issue #{data.id} {!data.available_for_purchase && <> is sold out</>}
          </h1>
          <span className='cover__status--buy'>
            {' '}
            {data.available_for_purchase && (
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
            )}
          </span>
        </div>

        <div  className='cover__status--cta'>
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
                    color: `${data.link_color}`,
                  }}
                >
                  selected stores
                </Link>
                .
              </div>
      </section>
    </>
  );
}
