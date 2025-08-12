import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'tipmebro.wtf - Interactive Terminal Experience',
  description: 'Experience a unique interactive terminal with fun commands, donations, and entertainment. Try commands like fortune, matrix, weather, and more in this retro-style terminal interface.',
  keywords: 'terminal, interactive, commands, fortune, matrix, weather, donation, crypto, bitcoin, ethereum, monzo, fun, retro, terminal emulator, web terminal',
  authors: [{ name: 'tipmebro.wtf' }],
  creator: 'tipmebro.wtf',
  publisher: 'tipmebro.wtf',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tipmebro.wtf'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'tipmebro.wtf - Interactive Terminal Experience',
    description: 'Experience a unique interactive terminal with fun commands, donations, and entertainment. Try commands like fortune, matrix, weather, and more.',
    url: 'https://tipmebro.wtf',
    siteName: 'tipmebro.wtf',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'tipmebro.wtf - Interactive Terminal Experience',
    description: 'Experience a unique interactive terminal with fun commands, donations, and entertainment.',
    creator: '@tipmebro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=yrQhrdaxi4__GcnD1EDKPNUWTMS1OpHAtayJYQ_Rx5w',
    yandex: 'da85235c92cca88b',
  },
  other: {
    'msvalidate.01': 'E0DFB732902433CE278E0A43112A20BF',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

import SecurityWrapper from './components/SecurityWrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=()" />
        
        {/* SEO and Social Media Optimization */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "tipmebro.wtf Terminal",
              "description": "Interactive terminal experience with fun commands and entertainment",
              "url": "https://tipmebro.wtf",
              "applicationCategory": "EntertainmentApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "tipmebro.wtf"
              }
            })
          }}
        />
        
        {/* Disable text selection */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
              user-select: none !important;
              -webkit-touch-callout: none !important;
            }
            
            /* Allow selection only for input fields */
            input, textarea {
              -webkit-user-select: text !important;
              -moz-user-select: text !important;
              -ms-user-select: text !important;
              user-select: text !important;
            }
            
            /* Hide scrollbars but keep functionality */
            ::-webkit-scrollbar {
              display: none;
            }
            
            * {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            
            /* Disable drag and drop */
            * {
              -webkit-user-drag: none;
              -khtml-user-drag: none;
              -moz-user-drag: none;
              -o-user-drag: none;
              user-drag: none;
            }
            
            /* Prevent image dragging */
            img {
              pointer-events: none;
            }
            
            /* Disable text highlighting */
            ::selection {
              background: transparent !important;
              color: inherit !important;
            }
            
            ::-moz-selection {
              background: transparent !important;
              color: inherit !important;
            }
          `
        }} />
      </head>
      <body>
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </body>
    </html>
  )
}
