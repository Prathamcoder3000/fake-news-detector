
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, RotateCcw, ClockIcon, ArrowLeft } from 'lucide-react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const result = searchParams.get('result')
  const confidence = searchParams.get('confidence')
  const explanation = searchParams.get('explanation')

  const isFake = result === 'Fake'
  const confidenceNum = Number(confidence) || 0

  // If no result params (e.g. navigated directly), show empty state
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-fade-in">
        <ClockIcon className="w-16 h-16 text-muted-foreground/40" />
        <h2 className="heading-sm text-muted-foreground">No Result Found</h2>
        <p className="text-muted-foreground text-sm">Analyze a news article first to see results here.</p>
        <Button onClick={() => router.push('/check-news')}>
          Check News
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/check-news')}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="heading-lg">Analysis Result</h1>
          <p className="text-muted-foreground mt-1">Here's what our AI found about your article</p>
        </div>
      </div>

      {/* Main Result Card */}
      <div className={`glass rounded-xl p-8 border-2 ${isFake ? 'border-red-500/40' : 'border-green-500/40'}`}>
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${isFake ? 'bg-red-500/15' : 'bg-green-500/15'}`}>
            {isFake
              ? <XCircle className="w-8 h-8 text-red-500" />
              : <CheckCircle2 className="w-8 h-8 text-green-500" />
            }
          </div>

          {/* Verdict */}
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">Verdict</p>
            <h2 className={`text-4xl font-bold ${isFake ? 'text-red-500' : 'text-green-500'}`}>
              {isFake ? 'Fake News' : 'Real News'}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {explanation || (isFake
                ? 'The model detected patterns similar to fake news.'
                : 'The content matches patterns of real news.')}
            </p>
          </div>
        </div>
      </div>

      {/* Confidence Score Card */}
      <div className="glass rounded-xl p-6 border border-border">
        <h3 className="heading-sm mb-4">Confidence Score</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            {/* Progress bar */}
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isFake ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${confidenceNum}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">0%</span>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
          </div>
          <div className={`text-3xl font-bold min-w-[4rem] text-right ${isFake ? 'text-red-500' : 'text-green-500'}`}>
            {confidenceNum}%
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {confidenceNum >= 85
            ? 'High confidence — the model is very certain about this result.'
            : confidenceNum >= 65
              ? 'Moderate confidence — consider cross-checking with other sources.'
              : 'Low confidence — treat this result with caution.'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" onClick={() => router.push('/check-news')} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Analyze Another Article
        </Button>
        <Button variant="outline" size="lg" onClick={() => router.push('/history')} className="flex-1">
          View History
        </Button>
      </div>
    </div>
  )
}

