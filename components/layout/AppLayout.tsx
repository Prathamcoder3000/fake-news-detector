'use client'

import { ReactNode, useState } from 'react'
import { TopNav } from './TopNav'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <TopNav 
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        menuOpen={mobileMenuOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
