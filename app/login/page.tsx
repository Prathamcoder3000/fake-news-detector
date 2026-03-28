'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    // In a real app, this would authenticate with a backend
    router.push('/dashboard')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg justify-center mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            V
          </div>
          <span>VeriNews AI</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md glass rounded-xl p-8 border border-border">
        <h1 className="heading-md mb-2">Welcome Back</h1>
        <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border border-border"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-foreground">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isLoading || !email || !password}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full py-2 px-4 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.889-2.126 5.413-5.033 5.769v-4.080h1.396a.75.75 0 0 0 .75-.75V9.631a.75.75 0 0 0-.75-.75h-1.396V7.5c0-.566.113-1.107.317-1.608a2.25 2.25 0 0 1 2.126-1.334h.878a.75.75 0 0 0 .75-.75V5.57a.75.75 0 0 0-.674-.743A9.478 9.478 0 0 0 14.8 5c-2.99 0-5.575 1.637-6.963 4.067V5.25a.75.75 0 0 0-.75-.75H5.37a.75.75 0 0 0-.75.75v9.5a.75.75 0 0 0 .75.75h1.687a.75.75 0 0 0 .75-.75V9.933c0-.02.001-.038.003-.057a2.25 2.25 0 0 1 4.417.695c0 .528.347 1 .75 1h1.396v1.8a.75.75 0 0 0 .75.75h1.930a.75.75 0 0 0 .75-.75v-4.129a9.42 9.42 0 0 1 .139-1.626Z" />
            </svg>
            Google
          </button>
          <button className="w-full py-2 px-4 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.19.092-.926.35-1.556.636-1.913-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.167 20 14.42 20 10c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
