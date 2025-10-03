import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cool Tool',
  description: 'A cool tool for doing cool things',
  generator: 'patil.yash',
  icons: {
    icon: 'https://cdn-icons-png.flaticon.com/512/2071/2071665.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
