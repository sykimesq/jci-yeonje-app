'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { Regulation } from '@/lib/types'
import { ChevronDown, FileText } from 'lucide-react'

export default function RegulationsClient({ regulations }: { regulations: Regulation[] }) {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openItem, setOpenItem] = useState<string | null>(null)

  const categories = useMemo(() => {
    const map: Record<string, Regulation[]> = {}
    regulations.forEach(r => {
      if (!map[r.category]) map[r.category] = []
      map[r.category].push(r)
    })
    return map
  }, [regulations])

  const categoryList = Object.entries(categories)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-jci-800">정관 및 규정</h1>
        <p className="text-jci-muted mt-1">부산연제청년회의소 정관 및 제 규정</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="hidden md:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            {categoryList.map(([cat, items]) => (
              <button
                key={cat}
                onClick={() => setOpenCategory(cat === openCategory ? null : cat)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  openCategory === cat
                    ? 'bg-jci-100 text-jci-600 font-medium'
                    : 'text-jci-muted hover:text-jci-800 hover:bg-gray-50'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {categoryList.map(([cat, items]) => (
            <div key={cat} className="bg-white rounded-xl border border-jci-border overflow-hidden">
              <button
                onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-jci-500" />
                  <span className="font-bold text-jci-800">{cat}</span>
                  <span className="text-xs text-jci-muted">({items.length}개)</span>
                </div>
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-jci-muted transition-transform',
                    openCategory === cat && 'rotate-180'
                  )}
                />
              </button>

              {openCategory === cat && (
                <div className="border-t border-jci-border divide-y divide-jci-border">
                  {items.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-jci-800">{item.title}</span>
                        <ChevronDown
                          size={14}
                          className={cn(
                            'text-jci-muted transition-transform shrink-0',
                            openItem === item.id && 'rotate-180'
                          )}
                        />
                      </button>
                      {openItem === item.id && item.content && (
                        <div className="px-4 pb-4">
                          <div className="text-sm text-jci-muted leading-relaxed whitespace-pre-line bg-gray-50 rounded-lg p-4">
                            {item.content}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {regulations.length === 0 && (
            <div className="text-center py-16 text-jci-muted bg-white rounded-xl border border-jci-border">
              <FileText size={40} className="mx-auto mb-2 opacity-30" />
              <p>등록된 정관/규정이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
