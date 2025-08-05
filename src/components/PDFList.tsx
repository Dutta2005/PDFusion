'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, FileText, CheckSquare, Square } from 'lucide-react'
import { PDFFile } from '@/types'

interface PDFListProps {
  files: PDFFile[]
  onUpdateFileAction: (id: string, selectedPages: number[]) => void
  onRemoveFileAction: (id: string) => void
}

export default function PDFList({ files, onUpdateFileAction, onRemoveFileAction }: PDFListProps) {
  const handlePageToggle = (fileId: string, pageNum: number, currentPages: number[]) => {
    const newPages = currentPages.includes(pageNum)
      ? currentPages.filter(p => p !== pageNum)
      : [...currentPages, pageNum].sort((a, b) => a - b)
    
    onUpdateFileAction(fileId, newPages)
  }

  const handleSelectAll = (fileId: string, pageCount: number, currentPages: number[]) => {
    const allPages = Array.from({ length: pageCount }, (_, i) => i + 1)
    const newPages = currentPages.length === pageCount ? [] : allPages
    onUpdateFileAction(fileId, newPages)
  }

  if (files.length === 0) {
    return (
      <Card className="glass-card">
        <CardContent className="p-12 text-center">
          <div className="h-20 w-20 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-slate-400" />
          </div>
          <p className="text-slate-400 text-lg">No PDF files uploaded yet</p>
          <p className="text-slate-500 text-sm mt-2">Upload some PDFs to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {files.map((file, index) => (
        <Card key={file.id} className="glass-card hover:border-blue-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div>
                <CardTitle className="text-lg text-white">{file.name}</CardTitle>
                <p className="text-sm text-slate-400">{file.pageCount} pages total</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemoveFileAction(file.id)}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-3 p-3 glass rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectAll(file.id, file.pageCount, file.selectedPages)}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                {file.selectedPages.length === file.pageCount ? (
                  <CheckSquare className="h-4 w-4 mr-2" />
                ) : (
                  <Square className="h-4 w-4 mr-2" />
                )}
                {file.selectedPages.length === file.pageCount ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-sm text-slate-400">
                {file.selectedPages.length} of {file.pageCount} pages selected
              </span>
            </div>
            
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
              {Array.from({ length: file.pageCount }, (_, i) => i + 1).map((pageNum) => {
                const isSelected = file.selectedPages.includes(pageNum)
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageToggle(file.id, pageNum, file.selectedPages)}
                    className={`
                      relative h-12 w-full rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-medium
                      ${
                        isSelected
                          ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 shadow-lg shadow-blue-500/25'
                          : 'border-slate-600 glass text-slate-400 hover:border-slate-500 hover:bg-slate-700/50'
                      }
                    `}
                  >
                    {pageNum}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <CheckSquare className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
            
            {file.selectedPages.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300 font-medium mb-2">
                  Selected pages ({file.selectedPages.length}):
                </p>
                <p className="text-sm text-slate-300">
                  {file.selectedPages.join(', ')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}