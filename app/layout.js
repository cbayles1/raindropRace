import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Turtle Race',
  description: '',
}

export default function RootLayout({children}) {
  return (
    <html lang="en" className='bg-terra'>
      <body className={inter.className}>
        <Link href="/">
          <h1 className='text-center w-full p-3 bg-nero text-oat text-3xl mb-4'>Turtle Race</h1>
        </Link>
        {children}
      </body>
    </html>
  )
}