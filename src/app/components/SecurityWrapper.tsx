'use client'

import { ReactNode } from 'react'

interface SecurityWrapperProps {
  children: ReactNode
}

export default function SecurityWrapper({ children }: SecurityWrapperProps) {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 'U') ||
          (e.ctrlKey && e.key === 's') ||
          (e.ctrlKey && e.key === 'S')
        ) {
          e.preventDefault();
          return false;
        }
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </div>
  )
}
