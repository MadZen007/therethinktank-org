import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
