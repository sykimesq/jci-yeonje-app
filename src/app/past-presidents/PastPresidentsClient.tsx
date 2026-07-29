'use client'

import { cn } from '@/lib/utils'
import type { PastPresident } from '@/lib/types'
import { Skull } from 'lucide-react'

export default function PastPresidentsClient({ presidents }: { presidents: PastPresident[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-jci-800">역대회장</h1>
        <p className="text-jci-muted mt-1">부산연제청년회의소 47년의 역사</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-jci-200" />

        <div className="space-y-3">
          {presidents.map((p) => (
            <div key={p.id} className="relative pl-14">
              {/* Timeline dot */}
              <div className={cn(
                'absolute left-4 top-4 w-4 h-4 rounded-full border-2 bg-white',
                p.is_deceased ? 'border-gray-300' : 'border-jci-500'
              )} />

              <div className={cn(
                'bg-white rounded-xl border p-4 transition-all hover:shadow-sm',
                p.is_deceased ? 'border-gray-200 opacity-80' : 'border-jci-border'
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-jci-500 bg-jci-50 px-2 py-0.5 rounded-full">
                      {p.generation}대
                    </span>
                    <span className="font-bold text-jci-800">{p.name}</span>
                    {p.name_hanja && (
                      <span className="text-sm text-jci-muted">({p.name_hanja})</span>
                    )}
                    {p.is_deceased && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Skull size={10} /> 故
                      </span>
                    )}
                  </div>
                  {p.term_years && (
                    <span className="text-xs text-jci-muted">{p.term_years}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
