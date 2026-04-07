'use client'

import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard'
import { Button } from '@/components/ui/button'
import { BarChart3, CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useUser } from '@/lib/UserContext'

const chartData = [
  { name: 'Jan', fake: 45, real: 120 },
  { name: 'Feb', fake: 38, real: 110 },
  { name: 'Mar', fake: 52, real: 145 },
  { name: 'Apr', fake: 41, real: 130 },
  { name: 'May', fake: 35, real: 125 },
  { name: 'Jun', fake: 48, real: 140 },
]

const pieData = [
  { name: 'Real News', value: 65 },
  { name: 'Fake News', value: 35 },
]

const activityData = [
  { headline: 'Breaking: New Climate Study Released', result: 'Real News', confidence: 92, time: '2 hours ago' },
  { headline: 'Celebrity Announces Retirement', result: 'Fake News', confidence: 78, time: '4 hours ago' },
  { headline: 'Market Index Hits New High', result: 'Real News', confidence: 88, time: '6 hours ago' },
  { headline: 'Government Announces Policy Change', result: 'Real News', confidence: 85, time: '8 hours ago' },
]

export default function DashboardPage() {
  const { user } = useUser()

  if (!user) {
    return <div>Please login to view your dashboard</div>
  }

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="heading-lg">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}! Here's your news verification overview</p>
          </div>
          <Link href="/check-news">
            <Button>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Check News
            </Button>
          </Link>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Total News Checked"
            value="1,247"
            change={12}
            icon={<BarChart3 className="w-6 h-6" />}
            color="primary"
          />
          <AnalyticsCard
            title="Fake News Detected"
            value="287"
            change={-5}
            icon={<AlertCircle className="w-6 h-6" />}
            color="warning"
          />
          <AnalyticsCard
            title="Accuracy Rate"
            value="97.2%"
            change={2}
            icon={<CheckCircle2 className="w-6 h-6" />}
            color="success"
          />
          <AnalyticsCard
            title="This Month"
            value="342"
            change={8}
            icon={<Clock className="w-6 h-6" />}
            color="accent"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-4">News Verification Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem'
                  }}
                />
                <Legend />
                <Bar dataKey="fake" fill="var(--color-destructive)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="real" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="glass rounded-xl p-6 border border-border flex flex-col">
            <h3 className="heading-sm mb-4">Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  <Cell fill="var(--color-chart-1)" />
                  <Cell fill="var(--color-destructive)" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-sm">Recent Activity</h3>
            <Link href="/history" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {activityData.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.headline}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${activity.result === 'Real News' ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.result}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.confidence}% confident</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
