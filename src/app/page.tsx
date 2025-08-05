'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ArrowRight, FileText, Merge, Download, Sparkles, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function LandingPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Merge className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">
              PDFusion
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300">The future of PDF merging is here</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient-secondary">
            Merge PDFs with
            <br />
            <span className="text-gradient">
              Precision & Style
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the most elegant way to merge PDF files. Select specific pages, 
            reorder with drag & drop, and create perfect documents in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="border-blue-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-secondary">
            Why Choose PDFusion?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built for professionals who demand precision, speed, and beautiful design
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Smart Page Selection</h3>
              <p className="text-slate-400 leading-relaxed">
                Preview and select exactly which pages you want. Visual thumbnails make it easy to choose the right content.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Lightning Fast</h3>
              <p className="text-slate-400 leading-relaxed">
                Powered by cutting-edge technology. Merge hundreds of pages in seconds with our optimized processing engine.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Secure & Private</h3>
              <p className="text-slate-400 leading-relaxed">
                Your documents are processed securely and never stored on our servers. Complete privacy guaranteed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-secondary">
            How It Works
          </h2>
          <p className="text-slate-400 text-lg">Simple, powerful, and intuitive</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Upload PDFs</h3>
              <p className="text-slate-400">
                Drag and drop your PDF files or click to browse. Support for multiple files at once.
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Select Pages</h3>
              <p className="text-slate-400">
                Choose specific pages from each PDF with our intuitive visual interface.
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Download</h3>
              <p className="text-slate-400">
                Get your perfectly merged PDF instantly. High quality, optimized file size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient-secondary">
              Ready to Transform Your PDF Workflow?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust PDFusion for their document merging needs.
            </p>
            <Link href="/auth/signin">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-4 text-lg">
                Start Merging Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-slate-800">
        <div className="text-center text-slate-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-6 w-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Merge className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gradient">
              PDFusion
            </span>
          </div>
          <p>&copy; 2024 PDFusion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}