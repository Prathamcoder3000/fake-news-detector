'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Upload, CheckCircle2, X } from 'lucide-react'
import { useState, useRef } from 'react'

const categories = [
  { id: 'misinformation', label: 'Misinformation', description: 'False or misleading information' },
  { id: 'satire', label: 'Satire', description: 'Content that mimics real news but is satirical' },
  { id: 'manipulated', label: 'Manipulated Media', description: 'Deepfakes or edited images/videos' },
  { id: 'clickbait', label: 'Clickbait', description: 'Misleading headlines or sensationalism' },
  { id: 'other', label: 'Other', description: 'Other types of suspicious content' },
]

export default function ReportNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [urlValue, setUrlValue] = useState('')
  const [articleText, setArticleText] = useState('')
  const [contextText, setContextText] = useState('')
  const [notifyMe, setNotifyMe] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file.name)
    }
  }

  const handleClear = () => {
    setSelectedCategory(null)
    setUrlValue('')
    setArticleText('')
    setContextText('')
    setUploadedFile(null)
    setConfirmed(false)
    setNotifyMe(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      handleClear()
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
          <div className="glass rounded-xl p-12 border border-border text-center max-w-md animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="heading-md mb-2">Report Submitted</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for helping us combat misinformation. Our team will review your report shortly.
            </p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Report</Button>
          </div>
        </div>
    )
  }

  return (
      <div className="space-y-8 animate-fade-in max-w-2xl">
        {/* Page Header */}
        <div>
          <h1 className="heading-lg">Report Fake News</h1>
          <p className="text-muted-foreground mt-1">Help us identify and remove misinformation from circulation</p>
        </div>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* News Source URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              News Source URL
            </label>
            <div className="space-y-2">
              <input
                type="url"
                placeholder="https://example.com/article"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground">
                Paste the URL of the article you want to report
              </p>
            </div>
          </div>

          {/* Article Text */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Article Text (Optional)
            </label>
            <Textarea
              placeholder="Paste the article text or headline here..."
              className="min-h-32 resize-none"
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Category <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-foreground">{category.label}</div>
                  <div className="text-sm text-muted-foreground">{category.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Screenshot or Proof (Optional)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="text-foreground font-medium">{uploadedFile}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setUploadedFile(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <h4 className="font-medium text-foreground mb-1">Upload Screenshot</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Drag and drop or click to upload
                  </p>
                  <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
                    Browse Files
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Additional Context */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Additional Context <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Explain why you believe this is misinformation or provide evidence..."
              className="min-h-24 resize-none"
              value={contextText}
              onChange={(e) => setContextText(e.target.value)}
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border border-border mt-1"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                required
              />
              <span className="text-sm text-muted-foreground">
                I confirm this report is accurate to the best of my knowledge
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border border-border mt-1"
                checked={notifyMe}
                onChange={(e) => setNotifyMe(e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                I'd like to be notified when this report is reviewed
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={!selectedCategory || !confirmed || !contextText.trim()}
            >
              Submit Report
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={handleClear}>
              Clear Form
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <div className="glass rounded-xl p-6 border border-border bg-blue-50/50 dark:bg-blue-950/20">
          <h4 className="font-semibold text-foreground mb-2">Community Guidelines</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Reports should be factual and based on evidence</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>We take all reports seriously and review them thoroughly</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>False or abusive reports may result in account restrictions</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Your identity will be kept confidential unless you opt-in for notifications</span>
            </li>
          </ul>
        </div>
      </div>
  )
}
