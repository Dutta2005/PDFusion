'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut, User, Merge } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-slate-800/50 glass backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Merge className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">
            PDFusion
          </span>
        </Link>
        
        {session && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass rounded-full px-4 py-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-slate-300">{session.user?.name || session.user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}