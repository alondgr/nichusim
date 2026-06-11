import type { Metadata, Viewport } from 'next'
import { Heebo } from 'next/font/google'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import './globals.css'

const heebo = Heebo({ subsets: ['hebrew'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#09090b',
}

export const metadata: Metadata = {
  title: 'מונדיאל 2026: זירת הניחוסים',
  description: 'האפליקציה שהופכת את העין הרע של החברה לשיטה מדעית.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚽</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.className} bg-zinc-950 text-slate-100 antialiased min-h-screen overflow-x-hidden`}>
        <ClerkProvider>
          <header className="flex justify-end p-4 z-50 relative">
            <Show when="signed-out">
              <div className="flex gap-4">
                <SignInButton />
                <SignUpButton />
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
