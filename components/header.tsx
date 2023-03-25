import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <Image
          src='/images/logo.png'
          className='logo'
          alt='Backstage-talks Logo'
          width={180}
          height={37}
          priority
        />
      </Link>

      <p className='contact'>
        <Link className='link2' href='mailto:info@backstagetalks.com'>
          info@backstagetalks.com
        </Link>
      </p>
    </header>
  );
}
