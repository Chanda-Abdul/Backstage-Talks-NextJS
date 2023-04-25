import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='header'>
      <Link href='/'>
        <Image
          src='/images/logo.png'
          className='header__logo'
          alt='Backstage-talks Logo'
          width={180}
          height={37}
          priority
        />
      </Link>
      <Link className='header__contact' href='mailto:info@backstagetalks.com'>
        info@backstagetalks.com
      </Link>
    </header>
  );
}
