/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Header from '@/components/header';
export default function Home() {
   console.log("hello world");
  return (
    <main>
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <Header/>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About Us</Link></p>
    </main>
   
  );
}
