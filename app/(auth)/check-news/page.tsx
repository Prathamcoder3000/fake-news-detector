'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Spinner } from '@/components/ui/spinner'
import { Upload, Link, Copy, Zap, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateAnalysisResult, saveAnalysisResult } from '@/lib/data'

export default function CheckNewsPage() {
  const [activeTab, setActiveTab] = useState('text')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleAnalyze = async () => {
    setError('')

    // Validation
    if (activeTab === 'text' && !content.trim()) {
      setError('Please paste some text to analyze')
      return
    }
    if (activeTab === 'url' && !url.trim()) {
      setError('Please paste a valid URL')
      return
    }
    if (activeTab === 'url' && !isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }
    if (activeTab === 'file' && !fileName) {
      setError('Please upload an image file to analyze')
      return
    }

    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false)
      
      // Generate and save analysis result
      const headline = activeTab === 'text' 
        ? content.split('\n')[0].substring(0, 100)
        : activeTab === 'url'
        ? url
        : fileName
      
      const result = generateAnalysisResult(
        headline,
        activeTab === 'text' ? content : undefined,
        activeTab === 'url' ? url : undefined,
        activeTab === 'file' ? fileName : undefined
      )
      
      saveAnalysisResult(result)
      
      // Navigate to results with the analyzed data
      router.push('/results')
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (PNG, JPG, etc.)')
        return
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFileName(file.name)
      setError('')
    }
  }

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const event = { target: { files: [file] } } as any
      handleFileUpload(event)
    }
  }

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="heading-lg">Check News</h1>
          <p className="text-muted-foreground mt-1">Paste your headline or article below to analyze its credibility</p>
        </div>

        {/* Analysis Card */}
        <div className="glass rounded-xl p-8 border border-border max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted rounded-lg p-1">
              <TabsTrigger value="text" className="data-[state=active]:bg-background">
                <Copy className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Paste Text</span>
                <span className="sm:hidden">Text</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="data-[state=active]:bg-background">
                <Link className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Paste URL</span>
                <span className="sm:hidden">URL</span>
              </TabsTrigger>
              <TabsTrigger value="file" className="data-[state=active]:bg-background">
                <Upload className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Upload File</span>
                <span className="sm:hidden">File</span>
              </TabsTrigger>
            </TabsList>

            {/* Text Tab */}
            <TabsContent value="text" className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Headline or Article Text
                </label>
                <Textarea
                  placeholder="Paste your headline or full article text here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-48 w-full resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  For better results, include the full article or at least 50+ words
                </p>
              </div>
            </TabsContent>

            {/* URL Tab */}
            <TabsContent value="url" className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Article URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  We'll fetch and analyze the article from the provided URL
                </p>
              </div>
            </TabsContent>

            {/* File Tab */}
            <TabsContent value="file" className="mt-6 space-y-4">
              <div 
                onDrop={handleDragDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer relative"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="block cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="font-medium text-foreground mb-2">Upload Screenshot or Image</h4>
                  {fileName ? (
                    <p className="text-sm text-green-600 mb-4">
                      Selected: <strong>{fileName}</strong>
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your image, or click to select
                    </p>
                  )}
                  <Button variant="outline" size="sm" type="button">
                    Browse Files
                  </Button>
                </label>
              </div>
            </TabsContent>
          </Tabs>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 mt-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing || (activeTab === 'text' && !content.trim()) || (activeTab === 'url' && !url.trim()) || (activeTab === 'file' && !fileName)}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze Now
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setContent('')
                setUrl('')
                setFileName('')
                setError('')
              }}
              disabled={isAnalyzing}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="glass rounded-lg p-4 border border-border">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Fast Analysis</h4>
            <p className="text-sm text-muted-foreground">Get results in seconds with our AI</p>
          </div>
          <div className="glass rounded-lg p-4 border border-border">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
              <Copy className="w-4 h-4 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Multiple Formats</h4>
            <p className="text-sm text-muted-foreground">Text, URLs, or image uploads</p>
          </div>
          <div className="glass rounded-lg p-4 border border-border">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
              <Link className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Detailed Report</h4>
            <p className="text-sm text-muted-foreground">Comprehensive analysis with sources</p>
          </div>
        </div>
      </div>
  )
}
