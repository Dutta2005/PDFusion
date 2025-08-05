import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cloudinary } from '@/lib/cloudinary'
import { PrismaClient } from '@prisma/client'
import { PDFDocument } from 'pdf-lib'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const userId = (session.user as any).id as string
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const pdfDoc = await PDFDocument.load(buffer)
    const pageCount = pdfDoc.getPageCount()

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'pdf-merger',
          public_id: `${userId}/${Date.now()}-${file.name}`,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    }) as any

    const pdfFile = await prisma.pDFFile.create({
      data: {
        name: file.name,
        url: uploadResult.secure_url,
        pageCount,
        userId,
      },
    })

    return NextResponse.json({
      id: pdfFile.id,
      name: pdfFile.name,
      url: pdfFile.url,
      pageCount: pdfFile.pageCount,
      selectedPages: [],
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}