import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] })

const baseUrl = new URL(process.env.NEXT_APP_URL || 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_APP_URL || 'http://localhost:3000'),
  title: 'Devlinks',
  description:
    'Share links to your social media profiles and projects with a single link.',
  openGraph: {
    images: baseUrl + 'opengraph-image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-dl-background select-none`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
