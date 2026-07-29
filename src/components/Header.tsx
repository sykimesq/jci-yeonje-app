'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SPECIAL_NAV_ITEMS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname.startsWith('/admin')) return null

  const isSpecial = pathname.startsWith('/special')
  const activeItems = isSpecial ? SPECIAL_NAV_ITEMS : NAV_ITEMS

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-jci-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand section: JC + Special side by side */}
        <div className="flex items-center gap-1">
          {/* 연제JC */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors',
              !isSpecial ? 'bg-jci-50' : 'hover:bg-gray-50'
            )}
          >
            <div className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs',
              !isSpecial ? 'bg-jci-500' : 'bg-jci-300'
            )}>
              JC
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                'text-sm font-bold',
                !isSpecial ? 'text-jci-800' : 'text-jci-muted'
              )}>연제JC</div>
              <div className="text-[10px] text-jci-muted -mt-0.5">회원수첩</div>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-8 bg-jci-border mx-1 hidden sm:block" />

          {/* 연제JC특우회 */}
          <Link
            href="/special"
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors',
              isSpecial ? 'bg-amber-50' : 'hover:bg-gray-50'
            )}
          >
            <div className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs',
              isSpecial ? 'bg-amber-500' : 'bg-gray-300'
            )}>
              SP
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                'text-sm font-bold',
                isSpecial ? 'text-amber-800' : 'text-jci-muted'
              )}>연제JC특우회</div>
              <div className="text-[10px] text-jci-muted -mt-0.5">회원수첩</div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {activeItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === item.href
                  ? isSpecial
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-jci-100 text-jci-600'
                  : 'text-jci-muted hover:text-jci-800 hover:bg-gray-50'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-jci-border bg-white">
          <nav className="px-4 py-3 space-y-1">
            {activeItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? isSpecial
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-jci-100 text-jci-600'
                    : 'text-jci-muted hover:text-jci-800 hover:bg-gray-50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
