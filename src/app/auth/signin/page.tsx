'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Merge, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="glass-card shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                <Merge className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gradient">
                PDFusion
              </CardTitle>
              <CardDescription className="text-slate-400 text-lg mt-2">
                Sign in to start merging your PDFs with style
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Sparkles className="h-4 w-4" />
                <span>Secure authentication powered by NextAuth</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Features Preview */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-400">What you'll get:</p>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <span>Smart page selection with visual previews</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <div className="h-2 w-2 bg-cyan-400 rounded-full"></div>
              <span>Lightning-fast PDF processing</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <div className="h-2 w-2 bg-indigo-400 rounded-full"></div>
              <span>Secure cloud storage for your files</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}