import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RethinkTank - Real Self-Help for People Who Hate Therapy Culture',
  description: 'Blunt self-help books that provide real answers. Get practical advice without the therapy culture fluff.',
  keywords: 'self-help, personal development, therapy culture, practical advice, books',
  authors: [{ name: 'RethinkTank' }],
  openGraph: {
    title: 'RethinkTank - Real Self-Help for People Who Hate Therapy Culture',
    description: 'Blunt self-help books that provide real answers. Get practical advice without the therapy culture fluff.',
    type: 'website',
    url: 'https://rethinktank.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RethinkTank - Real Self-Help for People Who Hate Therapy Culture',
    description: 'Blunt self-help books that provide real answers.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
