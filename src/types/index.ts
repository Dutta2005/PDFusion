export interface PDFFile {
  id: string
  name: string
  url: string
  pageCount: number
  selectedPages: number[]
}

export interface User {
  id: string
  email: string
  name?: string
}