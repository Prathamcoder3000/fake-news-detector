import Link from 'next/link'
import { ArrowRight, Shield, Zap, TrendingDown, Users, CheckCircle2, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const stats = [
    { label: 'Accuracy Rate', value: '98.7%' },
    { label: 'Articles Analyzed', value: '2.5M+' },
    { label: 'Fake News Detected', value: '1.2M+' },
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Advanced machine learning detects patterns and inconsistencies in news articles'
    },
    {
      icon: Shield,
      title: 'Credibility Score',
      description: 'Get an instant confidence score showing the likelihood of misinformation'
    },
    {
      icon: Zap,
      title: 'Real-time Detection',
      description: 'Analyze any headline or article in seconds with our powerful AI'
    },
    {
      icon: TrendingDown,
      title: 'Keyword Analysis',
      description: 'Identify suspicious words and patterns that indicate false information'
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Journalist',
      quote: 'VeriNews AI helps me verify sources quickly. It\'s become an essential tool in my workflow.'
    },
    {
      name: 'Mark Chen',
      role: 'Content Creator',
      quote: 'Detecting misinformation is now effortless. The accuracy is impressive and saves time.'
    },
    {
      name: 'Emma Wilson',
      role: 'Research Director',
      quote: 'The insights provided are invaluable. We recommend VeriNews AI to all our team members.'
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              V
            </div>
            <span>VeriNews AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-foreground hover:text-primary transition-colors font-medium">
              Sign In
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="heading-xl mb-6 text-balance">
            Detect Fake News with <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Advanced AI</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            VeriNews AI uses cutting-edge machine learning to analyze news articles and detect misinformation in seconds. Make informed decisions with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Check News Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-xl text-center">
            <div className="heading-lg text-primary mb-2">{stat.value}</div>
            <div className="text-muted-foreground font-medium">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="heading-lg text-center mb-4">Powerful Features</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          Everything you need to identify misinformation and stay informed
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="glass p-8 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="heading-sm mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="heading-lg text-center mb-12">Trusted by Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="glass p-8 rounded-xl flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                ))}
              </div>
              <p className="text-foreground mb-6 flex-1 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="heading-lg mb-4">Ready to Verify the Truth?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of professionals using VeriNews AI to combat misinformation
        </p>
        <Link href="/signup">
          <Button size="lg">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                V
              </div>
              <span>VeriNews AI</span>
            </div>
            <p className="text-muted-foreground text-sm">Detecting fake news with AI</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 VeriNews AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
