'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, CheckCircle2, Clock, Lightbulb, Flag, LogOut, Menu, Settings, User, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/check-news', label: 'Check News', icon: CheckCircle2 },
  { href: '/history', label: 'History', icon: Clock },
  { href: '/insights', label: 'AI Insights', icon: Lightbulb },
  { href: '/report-news', label: 'Report News', icon: Flag },
  { href: '/profile', label: 'Profile', icon: User },
]

const ADMIN_ITEMS = [
  { href: '/admin', label: 'Admin Panel', icon: Settings },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed md:static md:block w-64 h-[calc(100vh-64px)] border-r border-border bg-sidebar overflow-y-auto transition-transform duration-300 z-40 top-16 left-0',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        <nav className="flex flex-col h-full p-4 gap-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose || undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium',
                    active
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Admin Section */}
          <div className="mt-6 pt-4 border-t border-sidebar-border space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 flex items-center justify-between uppercase tracking-wide">
              <span>Admin</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[10px] font-bold">DEMO</span>
            </div>
            {ADMIN_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium',
                    active
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User Profile Section */}
          <div className="mt-4 pt-4 border-t border-sidebar-border space-y-3">
            {/* User Info */}
            <div className="px-3 py-3 rounded-lg bg-sidebar-accent/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-semibold text-sm">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">john@example.com</p>
                </div>
              </div>
            </div>

            {/* My Profile Button */}
            <Link
              href="/profile"
              onClick={onClose || undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 transition-all font-medium w-full text-left text-sm"
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span>My Profile</span>
            </Link>

            {/* Logout Button */}
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 transition-all font-medium w-full text-left text-sm">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}
