// Mock data persistence utilities
// In a real app, this would connect to a backend API

export interface AnalysisResult {
  id: string
  headline: string
  content?: string
  url?: string
  fileName?: string
  isFake: boolean
  confidence: number
  date: string
  credibilityScore: number
  aiAnalysis: string
  sources: string[]
}

const STORAGE_KEY = 'verinews_analysis_history'

export function loadAnalysisHistory(): AnalysisResult[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveAnalysisResult(result: AnalysisResult): void {
  if (typeof window === 'undefined') return
  try {
    const history = loadAnalysisHistory()
    history.unshift(result) // Add to beginning
    history.splice(50) // Keep only last 50 items
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch (error) {
    console.error('Failed to save analysis result:', error)
  }
}

export function deleteAnalysisResult(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const history = loadAnalysisHistory()
    const filtered = history.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to delete analysis result:', error)
  }
}

export function clearAnalysisHistory(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear analysis history:', error)
  }
}

export function generateAnalysisResult(
  headline: string,
  content?: string,
  url?: string,
  fileName?: string
): AnalysisResult {
  // Simulate AI analysis
  const confidence = Math.floor(Math.random() * 30) + 70 // 70-99%
  const isFake = Math.random() > 0.6 // 40% chance of being fake
  
  return {
    id: Date.now().toString(),
    headline,
    content,
    url,
    fileName,
    isFake,
    confidence,
    credibilityScore: isFake ? Math.floor(Math.random() * 40) + 10 : Math.floor(Math.random() * 40) + 60, // 10-50 or 60-99
    date: new Date().toLocaleString(),
    aiAnalysis: isFake 
      ? 'This article contains several warning signs: unverified sources, sensational language, and logical fallacies. The claims made are not supported by credible evidence.'
      : 'This article appears to be from a credible source with verified information. The claims are supported by reliable sources and expert opinions.',
    sources: [
      'Reuters',
      'Associated Press',
      'BBC News',
      'Snopes.com'
    ]
  }
}
