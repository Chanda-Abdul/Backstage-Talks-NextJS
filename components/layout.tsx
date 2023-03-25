import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.scss';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import Header from './header';
import Footer from './footer';

export const siteTitle = 'Backstage Talks | Magazine Archive';

export default function Layout({ children, home }) {

  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      {/* {!home && (
        // TO-DO => show only on /cover/[id]
        <div className={styles.backToHome}>
          <Link href='/'>← Back to home</Link>
        </div>
      )} */}
      <Footer />
    </div>
  );
}
