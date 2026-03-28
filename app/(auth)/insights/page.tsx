'use client'

import { Button } from '@/components/ui/button'
import { Download, TrendingUp } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const trendData = [
  { month: 'Jan', fake: 45, real: 120 },
  { month: 'Feb', fake: 38, real: 110 },
  { month: 'Mar', fake: 52, real: 145 },
  { month: 'Apr', fake: 41, real: 130 },
  { month: 'May', fake: 35, real: 125 },
  { month: 'Jun', fake: 48, real: 140 },
]

const topicsData = [
  { name: 'Politics', value: 280 },
  { name: 'Technology', value: 220 },
  { name: 'Health', value: 180 },
  { name: 'Science', value: 160 },
  { name: 'Entertainment', value: 140 },
]

const keywordData = [
  { keyword: 'Allegedly', frequency: 45 },
  { keyword: 'Unconfirmed', frequency: 38 },
  { keyword: 'Breaking (unverified)', frequency: 42 },
  { keyword: 'Sources say', frequency: 35 },
  { keyword: 'Exclusive', frequency: 28 },
]

export default function InsightsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="heading-lg">AI Insights</h1>
            <p className="text-muted-foreground mt-1">Analytics and trends from your news verification activity</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Time Period Selector */}
        <div className="glass rounded-xl p-4 border border-border flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
            Last 6 Months
          </button>
          <button className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
            Last Year
          </button>
          <button className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
            All Time
          </button>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-6">News Verification Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="fake" stroke="var(--color-destructive)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="real" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution Chart */}
          <div className="glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-6">Misinformation Topics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicsData}>
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
                <Bar dataKey="value" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-6">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Real News', value: 65 },
                    { name: 'Fake News', value: 35 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
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

          {/* Keywords Chart */}
          <div className="glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-6">Most Suspicious Keywords</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={keywordData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" />
                <YAxis dataKey="keyword" type="category" width={150} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem'
                  }}
                />
                <Bar dataKey="frequency" fill="var(--color-secondary)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Analyzed', value: '1,247', change: '+12%' },
            { label: 'Fake Detected', value: '287', change: '-5%' },
            { label: 'Avg. Confidence', value: '91.2%', change: '+3%' },
            { label: 'Improvement', value: '+8.5%', change: 'YoY' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Insights Summary */}
        <div className="glass rounded-xl p-8 border border-border bg-blue-50/50 dark:bg-blue-950/20">
          <h3 className="heading-sm mb-4">Key Insights</h3>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Misinformation trends show a <strong>12% increase in political news</strong> over the past 3 months</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>The most common fake news indicators are <strong>"allegedly" and "unconfirmed"</strong> keywords</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Your detection accuracy has improved by <strong>8.5% year-over-year</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Technology and health categories have the highest misinformation rate</span>
            </li>
          </ul>
        </div>
      </div>
  )
}
