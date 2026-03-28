import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface AnalyticsCardProps {
  title: string
  value: string | number
  change?: number
  icon: ReactNode
  color?: 'primary' | 'accent' | 'success' | 'warning'
}

export function AnalyticsCard({ title, value, change, icon, color = 'primary' }: AnalyticsCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-green-500/10 text-green-600',
    warning: 'bg-yellow-500/10 text-yellow-600',
  }

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(change)}% from last month
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
