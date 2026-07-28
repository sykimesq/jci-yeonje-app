'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown } from 'lucide-react'

interface YearOption {
  id: string
  year: number
  slogan: string
  is_current: boolean
}

interface YearSelectorProps {
  currentYearId: string
  onYearChange: (yearId: string, year: number) => void
}

export default function YearSelector({ currentYearId, onYearChange }: YearSelectorProps) {
  const [years, setYears] = useState<YearOption[]>([])
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('years')
        .select('id, year, slogan, is_current')
        .order('year', { ascending: false })
      if (data) setYears(data)
    }
    load()
  }, [supabase])

  const current = years.find(y => y.id === currentYearId)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-jci-border rounded-xl
          hover:border-jci-300 transition-colors text-sm font-medium text-jci-800"
      >
        {current ? `${current.year}년` : '연도 선택'}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-jci-border rounded-xl
            shadow-lg overflow-hidden min-w-[160px]">
            {years.map((y) => (
              <button
                key={y.id}
                onClick={() => {
                  onYearChange(y.id, y.year)
                  setOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-jci-50
                  ${y.id === currentYearId ? 'bg-jci-100 text-jci-600 font-medium' : 'text-jci-800'}`}
              >
                <span>{y.year}년</span>
                {y.is_current && (
                  <span className="ml-2 text-[10px] bg-jci-500 text-white px-1.5 py-0.5 rounded-full">
                    현재
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
