import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from 'react';
import {NextFont} from 'next/dist/compiled/@next/font';
import {Providers} from '@/app/providers';

const inter: NextFont = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Next.js App',
    description: 'いろんな機能を実験的に使ってみる',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='jp'>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
