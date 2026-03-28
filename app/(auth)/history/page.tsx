'use client'

import { Button } from '@/components/ui/button'
import { Search, Trash2, RotateCcw, ChevronLeft, ChevronRight, Eye, ClockIcon } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { loadAnalysisHistory, deleteAnalysisResult, clearAnalysisHistory, AnalysisResult } from '@/lib/data'

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<AnalysisResult[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterResult, setFilterResult] = useState<'all' | 'real' | 'fake'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const fetchHistory = useCallback(() => {
    setHistoryData(loadAnalysisHistory())
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const handleDelete = (id: string) => {
    deleteAnalysisResult(id)
    fetchHistory()
  }

  const handleClearAll = () => {
    clearAnalysisHistory()
    fetchHistory()
  }

  const filteredData = historyData.filter((item) => {
    const matchesSearch = item.headline.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterResult === 'all' ||
      (filterResult === 'fake' ? item.isFake : !item.isFake)
    return matchesSearch && matchesFilter
  })

  const itemsPerPage = 10
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="heading-lg">News History</h1>
            <p className="text-muted-foreground mt-1">View all your analyzed articles and verification results</p>
          </div>
          {historyData.length > 0 && (
            <Button variant="outline" onClick={handleClearAll} className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Clear All History
            </Button>
          )}
        </div>

        {/* Search & Filter Section */}
        <div className="glass rounded-xl p-6 border border-border space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search headlines..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setFilterResult('all'); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterResult === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All Results
            </button>
            <button
              onClick={() => { setFilterResult('real'); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterResult === 'real'
                  ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Real News
            </button>
            <button
              onClick={() => { setFilterResult('fake'); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterResult === 'fake'
                  ? 'bg-red-500/20 text-red-600 border border-red-500/30'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Fake News
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing {paginatedData.length} of {filteredData.length} results
        </p>

        {/* History Table */}
        <div className="glass rounded-xl border border-border overflow-hidden">
          {paginatedData.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <ClockIcon className="w-16 h-16 text-muted-foreground/40 mb-4" />
              <h3 className="heading-sm text-muted-foreground mb-2">No History Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                {searchQuery || filterResult !== 'all'
                  ? 'No results match your current filters.'
                  : 'You haven\'t analyzed any news articles yet. Start by checking a headline!'}
              </p>
              {!searchQuery && filterResult === 'all' && (
                <Button onClick={() => router.push('/check-news')}>
                  Analyze Your First Article
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Headline</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Result</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Confidence</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium max-w-xs truncate">
                        {item.headline}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            !item.isFake
                              ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                              : 'bg-red-500/20 text-red-700 dark:text-red-400'
                          }`}
                        >
                          {item.isFake ? 'Fake' : 'Real'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{item.confidence}%</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push('/results')}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="View result"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                          </button>
                          <button
                            onClick={() => router.push('/check-news')}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Re-check"
                          >
                            <RotateCcw className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-muted text-foreground'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
  )
}
