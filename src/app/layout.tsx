import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MyAppProvider } from '@/hooks/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devlinks',
  description:
    'Share links to your social media profiles and projects with a single link.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyAppProvider>{children}</MyAppProvider>
      </body>
    </html>
  )
}
