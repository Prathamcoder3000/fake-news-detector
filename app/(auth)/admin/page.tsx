'use client'

import { Button } from '@/components/ui/button'
import { BarChart3, Users, FileText, AlertTriangle, CheckCircle2, Trash2, Eye } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const adminStats = [
  { label: 'Total Users', value: '2,847', change: '+15%', icon: Users },
  { label: 'Total Reports', value: '342', change: '+8%', icon: FileText },
  { label: 'News Analyzed', value: '125k', change: '+23%', icon: BarChart3 },
  { label: 'Flagged Content', value: '48', change: '+2%', icon: AlertTriangle },
]

const trendData = [
  { month: 'Jan', users: 1200, reports: 120 },
  { month: 'Feb', users: 1400, reports: 145 },
  { month: 'Mar', users: 1800, reports: 180 },
  { month: 'Apr', users: 2100, reports: 210 },
  { month: 'May', users: 2500, reports: 250 },
  { month: 'Jun', users: 2847, reports: 280 },
]

const pendingReports = [
  { id: 1, headline: 'Breaking: False Celebrity News', category: 'Misinformation', reported: '2h ago', status: 'pending' },
  { id: 2, headline: 'Deepfake Video Circulating', category: 'Manipulated Media', reported: '4h ago', status: 'pending' },
  { id: 3, headline: 'Political Satire Misunderstood', category: 'Satire', reported: '6h ago', status: 'pending' },
  { id: 4, headline: 'Clickbait Health Article', category: 'Clickbait', reported: '8h ago', status: 'pending' },
]

const topUsers = [
  { id: 1, name: 'Sarah Johnson', reports: 28, accuracy: 96 },
  { id: 2, name: 'Mark Chen', reports: 24, accuracy: 94 },
  { id: 3, name: 'Emma Wilson', reports: 21, accuracy: 97 },
  { id: 4, name: 'James Rodriguez', reports: 19, accuracy: 92 },
]

export default function AdminPage() {
  return (
    <div className="space-y-8 animate-fade-in">
        {/* Admin Header */}
        <div>
          <h1 className="heading-lg">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage users, content, and monitor platform health</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="glass rounded-xl p-6 border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-2">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <div className="glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-6">User Growth Trend</h3>
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
                <Line type="monotone" dataKey="users" stroke="var(--color-chart-1)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Reports Trend */}
          <div className="glass rounded-xl p-6 border border-border">
            <h3 className="heading-sm mb-6">Report Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
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
                <Bar dataKey="reports" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="glass rounded-xl p-6 border border-border">
          <h3 className="heading-sm mb-6">Pending Report Reviews</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Content</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Reported</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pendingReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{report.headline}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.reported}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Review">
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Approve">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground hover:text-green-600 transition-colors" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600 transition-colors" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="glass rounded-xl p-6 border border-border">
          <h3 className="heading-sm mb-6">Top Contributors</h3>
          <div className="space-y-3">
            {topUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.reports} reports submitted</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">{user.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Tools */}
        <div className="glass rounded-xl p-6 border border-border">
          <h3 className="heading-sm mb-6">Admin Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              Manage Dataset
            </Button>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
            <Button variant="outline" className="w-full">
              User Management
            </Button>
            <Button variant="outline" className="w-full">
              Content Moderation
            </Button>
            <Button variant="outline" className="w-full">
              System Settings
            </Button>
            <Button variant="outline" className="w-full">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
  )
}
