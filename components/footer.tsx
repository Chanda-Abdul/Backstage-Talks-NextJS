import Link from 'next/link';
import styles from '../styles/footer.module.scss';
import useSWR from 'swr';
import { Cover } from '@/interfaces';
import CoverComponent from '@/components/Cover';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Footer() {
  const { data, error, isLoading } = useSWR<Cover[]>('/api/covers', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  return (
    <footer className={styles.footer__container}>
      <div className={styles.footer__bottomLeft}>
        <p className={styles.footer__info}>
        Backstage Talks is a&nbsp;magazine of&nbsp;casual, but in&nbsp;depth
        dialogues on&nbsp;design and business. Our decisions shape and influence
        this complex world—to have a&nbsp;chance to&nbsp;make the right ones, we
        need to talk.</p>
        <h4 className='copyright'>
          <span>
            &copy; 2023{' '}
            <Link
              href='http://milk.sk/'
              target='_blank'
              rel='noreferrer'
              className={styles.footer__link}
            >
              Published by studio Milk
            </Link>
            .
          </span>
          <span>
            Coded by{' '}
            <Link href='www.ChandaCodes.com' className={styles.footer__link}>
              Chanda Abdul
            </Link>
          </span>
        </h4>
        <Link href='/privacy-policy.php' >
          <h5 className={styles.footer__copyright}>Privacy Policy </h5>
        </Link>
      </div>
      <div className={styles.footer__bottomRight}>
        <ul className={styles.footer__list}>
          {data.map((c) => (
            <li className={styles.footer__listItem} key={c.id} >
              <CoverComponent key={c.id} cover={c}  />
              </li>
          ))}
        </ul>
      <p className={styles.footer__contact}>
        <Link
          href='mailto:info@backstagetalks.com'
          className={styles.footer__link}
        >
          info@backstagetalks.com
        </Link>
      </p></div>
      
      
    </footer>
  );
}
