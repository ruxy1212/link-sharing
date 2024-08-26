import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MyAppProvider } from '@/hooks/context'
import NextTopLoader from 'nextjs-toploader';

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
      <body className={inter.className} style={{ backgroundColor: 'white'}}>
        <NextTopLoader
          color="#633bff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <MyAppProvider>{children}</MyAppProvider>
      </body>
    </html>
  )
}
