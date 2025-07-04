/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
export default function Home() {
   console.log("hello world");
  return (
    <main>
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About Us</Link></p>
    </main>
   
  );
}
