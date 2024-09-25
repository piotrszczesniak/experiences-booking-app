import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import './globals.scss';

import Footer from './components/Footer';
import MainMenu from './components/MainMenu';

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bumper Ball | Experiences',
  description:
    'Top Things To Do in Krakow & Warsaw. Activities, City Tours, Fair Prices, 5* Service, Hassle Free Options For Stag Do, Hen Do, Team Building, Couples.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={robotoSlab.className}>
        <main>
          <MainMenu />
          ---
          {children}
          ---
          <Footer />
        </main>
      </body>
    </html>
  );
}
