import Link from 'next/link';
import useSWR from 'swr';
import { Cover } from '@/interfaces';
import CoverPage from '@/pages/cover/[id]';
import CoverComponent from './Cover';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Footer() {
  const { data, error, isLoading } = useSWR<Cover[]>('/api/covers', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  
  return (
    <footer className='footer'>
      <div className='footer__bottomLeft'>
        <div className='footer__info'>
          <p className='footer__description'>
            Backstage Talks is a&nbsp;magazine of&nbsp;casual, but in&nbsp;depth
            dialogues on&nbsp;design and business. Our decisions shape and
            influence this complex world—to have a&nbsp;chance to&nbsp;make the
            right ones, we need to talk.
          </p>
          <p className='footer__copyright'>
            <span>
              &copy; 2023{' '}
              <Link
                href='http://milk.sk/'
                target='_blank'
                rel='noreferrer'
                className='footer__link'
              >
                Published by studio Milk
              </Link>
              .&nbsp; 
            </span>
            <span>
              Coded by&nbsp; 
              <Link href='www.ChandaAbdul.dev' className='footer__link'>
                Chanda Abdul
              </Link>
            </span>
          </p>
          <Link href='/privacy-policy.php' className='footer__privacy'>
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className='footer__bottomRight'>
        <ul className='footer__list'>
          {data.map((c) => (
            <li className='footer__listItem' key={c.id}>
              <CoverComponent key={c.id} cover={c} />
            </li>
          ))}
        </ul>
        <div className='footer__contact'>
          <Link href='mailto:info@backstagetalks.com' className='footer__link'>
            info@backstagetalks.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
