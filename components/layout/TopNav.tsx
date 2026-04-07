'use client'

import Link from 'next/link'
import { Search, Bell, Menu, X, Settings, LogOut, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/UserContext'

interface TopNavProps {
  onMenuClick?: () => void
  menuOpen?: boolean
}

export function TopNav({ onMenuClick, menuOpen = false }: TopNavProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, logout } = useUser()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-6 gap-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
            V
          </div>
          <span className="hidden sm:inline text-foreground">VeriNews AI</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
            searchFocused ? 'border-primary bg-card' : 'border-border bg-muted/50'
          }`}>
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search news..."
              className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2.5 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Notification Bell */}
          <button className="p-2.5 rounded-lg hover:bg-muted transition-colors relative hidden sm:flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          {user ? (
            <div ref={menuRef} className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-border relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  
                  <button
                    onClick={() => {
                      router.push('/profile')
                      setUserMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted w-full text-left transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push('/profile')
                      setUserMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted w-full text-left transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <div className="border-t border-border my-1" />

                  <button
                    onClick={() => {
                      logout()
                      router.push('/login')
                      setUserMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-muted w-full text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 hover:opacity-75 transition-opacity pl-2 sm:pl-4 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-foreground">Login</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
