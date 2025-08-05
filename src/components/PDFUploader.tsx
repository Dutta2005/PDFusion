'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, Sparkles } from 'lucide-react'
import { PDFFile } from '@/types'

interface PDFUploaderProps {
  onUpload: (file: PDFFile) => void
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (file.type === 'application/pdf') {
        setUploading(true)
        setUploadProgress(0)

        try {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          if (response.ok) {
            const uploadedFile = await response.json()
            onUpload(uploadedFile)
            setUploadProgress(100)
          } else {
            console.error('Upload failed')
          }
        } catch (error) {
          console.error('Upload error:', error)
        } finally {
          setUploading(false)
          setTimeout(() => setUploadProgress(0), 1000)
        }
      }
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  })

  return (
    <Card className="border-2 border-dashed border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 glass-card">
      <CardContent className="p-12">
        <div
          {...getRootProps()}
          className={`text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? 'text-blue-400 scale-105' : 'text-slate-300'
          }`}
        >
          <input {...getInputProps()} />
          <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
            isDragActive 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-110' 
              : 'bg-gradient-to-r from-slate-700 to-slate-800'
          }`}>
            <Upload className="h-10 w-10 text-white" />
          </div>
          {isDragActive ? (
            <div>
              <p className="text-2xl font-semibold mb-2 text-blue-400">
                Drop your PDFs here!
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-300">Ready to process</span>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-semibold mb-4 text-white">
                Upload Your PDF Files
              </p>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                Drag & drop your PDF files here, or click the button below to browse
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-blue-500 transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                Choose PDF Files
              </Button>
            </div>
          )}
        </div>
        {uploading && (
          <div className="mt-8">
            <div className="glass rounded-lg p-4">
              <Progress 
                value={uploadProgress} 
                className="w-full h-2 bg-slate-700"
              />
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <p className="text-sm text-slate-300">Processing your PDF...</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}