import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { ContextProvider } from '@/context/store';
import { Suspense } from 'react';

const font = Roboto_Condensed({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bemobile Challenge',
  description: 'A simple comic book listing application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ContextProvider>
          <Suspense>
            <Header />
          </Suspense>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
