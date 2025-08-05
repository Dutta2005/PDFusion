import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PDFDocument } from 'pdf-lib'
import fetch from 'node-fetch'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { files } = await request.json()

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const mergedPdf = await PDFDocument.create()

    for (const file of files) {
      const response = await fetch(file.url)
      const pdfBytes = await response.arrayBuffer()
      const pdf = await PDFDocument.load(pdfBytes)
      
      const pages = file.selectedPages.length > 0 
        ? file.selectedPages 
        : Array.from({ length: file.pageCount }, (_, i) => i + 1)

      for (const pageNum of pages) {
        const [copiedPage] = await mergedPdf.copyPages(pdf, [pageNum - 1])
        mergedPdf.addPage(copiedPage)
      }
    }

    const pdfBytes = await mergedPdf.save()
    
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged.pdf"',
      },
    })
  } catch (error) {
    console.error('Merge error:', error)
    return NextResponse.json({ error: 'Merge failed' }, { status: 500 })
  }
}