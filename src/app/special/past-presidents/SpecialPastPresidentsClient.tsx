'use client'

import { cn } from '@/lib/utils'
import type { SpecialPastPresident } from '@/lib/types'
import { Skull } from 'lucide-react'

export default function SpecialPastPresidentsClient({ presidents }: { presidents: SpecialPastPresident[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-800">특우회 역대회장</h1>
        <p className="text-jci-muted mt-1">연제JC특우회 역대회장 기록</p>
      </div>

      {presidents.length === 0 ? (
        <div className="text-center py-16 text-jci-muted">
          <p className="text-lg">등록된 역대회장 정보가 없습니다</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200" />

          <div className="space-y-3">
            {presidents.map((p) => (
              <div key={p.id} className="relative pl-14">
                <div className={cn(
                  'absolute left-4 top-4 w-4 h-4 rounded-full border-2 bg-white',
                  p.is_deceased ? 'border-gray-300' : 'border-amber-500'
                )} />

                <div className={cn(
                  'bg-white rounded-xl border p-4 transition-all hover:shadow-sm',
                  p.is_deceased ? 'border-gray-200 opacity-80' : 'border-amber-200'
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        {p.generation}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
