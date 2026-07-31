'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ADMIN_NAV_ITEMS, ADMIN_SPECIAL_NAV_ITEMS } from '@/lib/constants'
import {
  LayoutDashboard, Users, Briefcase, Calendar, History, FileText, CalendarDays,
  LogOut, Menu, X, ChevronRight
} from 'lucide-react'

const ICONS: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  Briefcase: <Briefcase size={20} />,
  Calendar: <Calendar size={20} />,
  History: <History size={20} />,
  FileText: <FileText size={20} />,
  CalendarDays: <CalendarDays size={20} />,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState<'jc' | 'special'>('jc')
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!s) {
        router.push('/admin/login')
      } else {
        setSession(s)
      }
      setLoading(false)
    })
  }, [supabase, router])

  // Auto-detect tab from pathname
  useEffect(() => {
    if (pathname.startsWith('/admin/special')) {
      setTab('special')
    } else {
      setTab('jc')
    }
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-2 border-jci-300 border-t-jci-500 rounded-full animate-spin" />
    </div>
  )
  if (!session) return null

  const navItems = tab === 'jc' ? ADMIN_NAV_ITEMS : ADMIN_SPECIAL_NAV_ITEMS

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-jci-border flex flex-col transition-transform md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        <div className="p-4 border-b border-jci-border">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-jci-500 flex items-center justify-center text-white font-bold text-sm">
                JC
              </div>
              <div>
                <div className="text-sm font-bold text-jci-800">연제JC 관리</div>
                <div className="text-[10px] text-jci-muted">회원수첩 Admin</div>
              </div>
            </Link>
            <button className="md:hidden p-1" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-jci-border">
          <button
            onClick={() => setTab('jc')}
            className={cn(
              'flex-1 py-2.5 text-xs font-medium text-center transition-colors',
              tab === 'jc'
                ? 'text-jci-600 border-b-2 border-jci-500 bg-jci-50/50'
                : 'text-jci-muted hover:text-jci-800'
            )}
          >
            연제JC
          </button>
          <button
            onClick={() => setTab('special')}
            className={cn(
              'flex-1 py-2.5 text-xs font-medium text-center transition-colors',
              tab === 'special'
                ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50'
                : 'text-jci-muted hover:text-jci-800'
            )}
          >
            특우회
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? tab === 'jc' ? 'bg-jci-100 text-jci-600' : 'bg-amber-100 text-amber-700'
                  : 'text-jci-muted hover:text-jci-800 hover:bg-gray-50'
              )}
            >
              {ICONS[item.icon]}
              <span>{item.label}</span>
              {pathname === item.href && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-jci-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-jci-border h-14 flex items-center px-4 gap-3">
          <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="text-sm text-jci-muted">
            {session.user?.email}
          </div>
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
