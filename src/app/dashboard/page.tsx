'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import PDFUploader from '@/components/PDFUploader'
import PDFList from '@/components/PDFList'
import { Button } from '@/components/ui/button'
import { Download, Sparkles } from 'lucide-react'
import { PDFFile } from '@/types'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [files, setFiles] = useState<PDFFile[]>([])
  const [merging, setMerging] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const handleUpload = (file: PDFFile) => {
    setFiles(prev => [...prev, file])
  }

  const handleUpdateFile = (id: string, selectedPages: number[]) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, selectedPages } : file
    ))
  }

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const handleMerge = async () => {
    if (files.length === 0) return

    setMerging(true)
    try {
      const response = await fetch('/api/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'merged.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Merge failed')
      }
    } catch (error) {
      console.error('Merge error:', error)
    } finally {
      setMerging(false)
    }
  }

  const hasSelectedPages = files.some(file => file.selectedPages.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300">Welcome back, {session.user?.name}</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-gradient-secondary">
              Merge Your PDFs
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Upload your PDF files and select specific pages to create the perfect merged document
            </p>
          </div>

          <PDFUploader onUpload={handleUpload} />

          <PDFList
            files={files}
            onUpdateFile={handleUpdateFile}
            onRemoveFile={handleRemoveFile}
          />

          {files.length > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={handleMerge}
                disabled={merging || !hasSelectedPages}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {merging ? 'Merging...' : 'Merge PDFs'}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}