import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'tipmebro.wtf',
  description: 'Secure terminal interface',
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
        
        {/* Prevent right-click context menu */}
        <meta name="robots" content="noindex, nofollow" />
        
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
