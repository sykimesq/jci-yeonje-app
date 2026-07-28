'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { MONTHS } from '@/lib/constants'
import type { Schedule } from '@/lib/types'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

export default function SchedulesClient({ schedules }: { schedules: Schedule[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  const monthSchedules = useMemo(() =>
    schedules.filter(s => s.month === currentMonth + 1),
    [schedules, currentMonth]
  )

  const groupedByMonth = useMemo(() => {
    const groups: Record<number, Schedule[]> = {}
    schedules.forEach(s => {
      if (!groups[s.month]) groups[s.month] = []
      groups[s.month].push(s)
    })
    return groups
  }, [schedules])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-jci-800">연간일정</h1>
        <p className="text-jci-muted mt-1">2026년 부산연제청년회의소 주요 일정</p>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-jci-border p-3">
        <button
          onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
          disabled={currentMonth === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <CalendarDays size={20} className="text-jci-500" />
          <span className="font-bold text-lg text-jci-800">{MONTHS[currentMonth]}</span>
          <span className="text-sm text-jci-muted">
            ({monthSchedules.length}개 일정)
          </span>
        </div>
        <button
          onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
          disabled={currentMonth === 11}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Current Month Schedule */}
      <div className="mb-8">
        {monthSchedules.length > 0 ? (
          <div className="space-y-3">
            {monthSchedules.map((s) => (
              <div
                key={s.id}
                className={cn(
                  'bg-white rounded-xl border p-4 transition-all',
                  s.is_important
                    ? 'border-jci-gold bg-gradient-to-r from-amber-50 to-white'
                    : 'border-jci-border'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="text-center min-w-[40px]">
                    <div className="text-xs text-jci-muted">{MONTHS[s.month - 1]}</div>
                    <div className="text-xl font-bold text-jci-800">{s.day || '-'}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-jci-800">{s.title}</h3>
                      {s.is_important && (
                        <span className="text-[10px] bg-jci-gold/20 text-jci-gold px-1.5 py-0.5 rounded-full font-medium">
                          중요
                        </span>
                      )}
                    </div>
                    {s.description && (
                      <p className="text-sm text-jci-muted mt-1">{s.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-jci-muted bg-white rounded-xl border border-jci-border">
            <CalendarDays size={40} className="mx-auto mb-2 opacity-30" />
            <p>이번 달은 일정이 없습니다</p>
          </div>
        )}
      </div>

      {/* Full Year Overview */}
      <div>
        <h2 className="text-lg font-bold text-jci-800 mb-4">연간 일정 개요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
            const ms = groupedByMonth[month] || []
            return (
              <button
                key={month}
                onClick={() => setCurrentMonth(month - 1)}
                className={cn(
                  'bg-white rounded-xl border p-4 text-left transition-all',
                  currentMonth === month - 1
                    ? 'border-jci-500 ring-1 ring-jci-300'
                    : 'border-jci-border hover:border-jci-300'
                )}
              >
                <div className="font-bold text-jci-800 text-sm">{MONTHS[month - 1]}</div>
                <div className="text-xs text-jci-muted mt-1">
                  {ms.length > 0
                    ? ms.map(s => s.title).join(', ').slice(0, 60) + (ms.map(s => s.title).join(', ').length > 60 ? '...' : '')
                    : '일정 없음'}
                </div>
                {ms.length > 0 && (
                  <div className="mt-2 text-[10px] text-jci-500 font-medium">
                    {ms.length}개 일정
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
