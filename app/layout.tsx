import React from 'react';
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Chatwoot',
  description: 'Best user support web app',
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
