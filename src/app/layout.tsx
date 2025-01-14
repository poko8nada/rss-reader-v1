import type { Metadata } from 'next'
import './globals.css'
import Footer from '../components/footer'
import Header from '../components/header'

export const metadata: Metadata = {
  title: 'RSSを読んでみよう',
  description: 'RSSを読んでみよう',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={'antialiased'}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
