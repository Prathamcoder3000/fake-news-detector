'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BarChart3, CheckCircle2, Flag, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
        {/* Profile Header */}
        <div className="glass rounded-xl p-8 border border-border">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              JD
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="heading-lg">{formData.name}</h1>
              <p className="text-muted-foreground mt-1">Verified News Analyst</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {formData.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {formData.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Joined {formData.joinDate}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'default' : 'outline'}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Articles Verified</p>
                <p className="text-2xl font-bold text-foreground mt-1">1,247</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Reports Submitted</p>
                <p className="text-2xl font-bold text-foreground mt-1">42</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Flag className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold text-foreground mt-1">97.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="glass rounded-xl p-8 border border-border">
          <h2 className="heading-md mb-6">Account Information</h2>

          {isEditing ? (
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              {/* Save Button */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Discard
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="text-foreground font-medium">{formData.name}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="text-foreground font-medium">{formData.email}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="text-foreground font-medium">{formData.phone}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">{formData.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="glass rounded-xl p-8 border border-border">
          <h2 className="heading-md mb-6">Security</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="mt-6">Update Password</Button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="glass rounded-xl p-8 border border-border">
          <h2 className="heading-md mb-6">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { label: 'Email me about important updates', checked: true },
              { label: 'Email me when a report I submitted is reviewed', checked: true },
              { label: 'Send daily news verification summary', checked: false },
              { label: 'Notify me about new features', checked: true },
            ].map((pref) => (
              <label key={pref.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={pref.checked}
                  className="w-4 h-4 rounded border border-border"
                />
                <span className="text-foreground">{pref.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass rounded-xl p-8 border border-red-500/20 bg-red-50/50 dark:bg-red-950/20">
          <h2 className="heading-md mb-4 text-red-600">Danger Zone</h2>
          <p className="text-muted-foreground mb-6">
            These actions are irreversible. Please proceed with caution.
          </p>
          <Button variant="outline" className="border-red-500/30 text-red-600 hover:bg-red-500/10">
            Delete Account
          </Button>
        </div>
      </div>
  )
}
