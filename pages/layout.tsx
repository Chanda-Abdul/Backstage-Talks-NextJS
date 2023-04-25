import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'Backstage Talks | Magazine Archive',
  description: '',
  viewpor: 'width=device-width, initial-scale=1',
  icon: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='container'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
