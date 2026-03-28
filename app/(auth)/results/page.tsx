'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle2, Share2, Flag, RefreshCw, ExternalLink, ArrowLeft, Brain, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadAnalysisHistory, AnalysisResult } from '@/lib/data'

const credibilityItems = [
  { label: 'Source Credibility', realScore: 88, fakeScore: 24 },
  { label: 'Content Analysis', realScore: 91, fakeScore: 31 },
  { label: 'Pattern Matching', realScore: 95, fakeScore: 18 },
]

const suspiciousKeywords = ['Allegedly', 'Unconfirmed', 'Sources say', 'Breaking (unverified)', 'Exclusive']
const credibleKeywords = ['According to', 'Research shows', 'Officials confirmed', 'Studies indicate', 'Verified by']

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const history = loadAnalysisHistory()
    if (history.length > 0) {
      setResult(history[0])
    }
    setLoading(false)
  }, [])

  const handleShare = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(
          `VeriNews AI Analysis: "${result.headline}" — ${result.isFake ? 'Likely Fake News' : 'Likely Real News'} (${result.confidence}% confidence)`
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // No result found
  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass rounded-xl p-12 border border-border text-center max-w-md">
          <Brain className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="heading-md mb-2">No Result Found</h2>
          <p className="text-muted-foreground mb-6">
            You haven't analyzed any news yet. Go to Check News to get started.
          </p>
          <Button onClick={() => router.push('/check-news')}>
            Analyze News
          </Button>
        </div>
      </div>
    )
  }

  const { isFake, confidence, headline, aiAnalysis, sources } = result
  const displayKeywords = isFake ? suspiciousKeywords : credibleKeywords

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Result Header */}
        <div className="glass rounded-xl p-8 border border-border">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Analysis Result</p>
              <h1 className="heading-lg mb-4">
                <span className={isFake ? 'text-red-600' : 'text-green-600'}>
                  {isFake ? 'Likely Fake News' : 'Likely Real News'}
                </span>
              </h1>
              <p className="text-foreground text-lg mb-4">
                "{headline}"
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold text-white ${isFake ? 'bg-red-500' : 'bg-green-500'}`}>
              {isFake ? 'Fake' : 'Real'}
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="glass rounded-xl p-8 border border-border">
          <h3 className="heading-sm mb-6">Confidence Score</h3>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${isFake ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Our model is {confidence}% confident in this analysis
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${isFake ? 'text-red-600' : 'text-green-600'}`}>{confidence}%</div>
              <p className="text-sm text-muted-foreground">Confidence</p>
            </div>
          </div>
        </div>

        {/* Credibility Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credibilityItems.map((item) => {
            const score = isFake ? item.fakeScore : item.realScore
            const color = score >= 60 ? 'green' : 'red'
            return (
              <div key={item.label} className="glass rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-3 text-center">{item.label}</p>
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/30"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${(score / 100) * 283} 283`}
                      className={`text-${color}-500 transition-all`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{score}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Keyword Analysis */}
        <div className="glass rounded-xl p-8 border border-border">
          <h3 className="heading-sm mb-4">
            {isFake ? 'Suspicious Keywords Found' : 'Credibility Indicators Found'}
          </h3>
          <div className="space-y-3">
            {displayKeywords.map((keyword) => (
              <div key={keyword} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                {isFake
                  ? <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  : <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                }
                <span className="text-foreground font-medium">{keyword}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {isFake ? 'Detected in article' : 'Positive signal'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Explanation */}
        <div className="glass rounded-xl p-8 border border-border bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/30">
          <h3 className="heading-sm mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            AI Analysis
          </h3>
          <p className="text-foreground leading-relaxed">
            {aiAnalysis}
          </p>
        </div>

        {/* Suggested Sources */}
        <div className="glass rounded-xl p-8 border border-border">
          <h3 className="heading-sm mb-4">Trusted Sources for Verification</h3>
          <div className="space-y-3">
            {sources.map((source) => (
              <div key={source} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{source}</h4>
                  <p className="text-sm text-muted-foreground">Trusted news source</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Verified</div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            className="flex-1"
            onClick={() => router.push('/check-news')}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Analyze Another News
          </Button>
          <Button className="flex-1" variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Share Result'}
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => router.push('/report-news')}>
            <Flag className="w-4 h-4 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>
  )
}
