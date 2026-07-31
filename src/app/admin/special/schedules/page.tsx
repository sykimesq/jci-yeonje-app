'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { MONTHS } from '@/lib/constants'
import type { Schedule } from '@/lib/types'

export default function AdminSpecialSchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Schedule | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: years } = await (supabase as any).from('years').select('id').eq('is_current', true).single()
    if (!years) return
    const { data } = await (supabase as any).from('schedules').select('*').eq('year_id', years.id).order('month').order('day')
    if (data) setSchedules(data)
  }

  async function handleDelete(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await (supabase as any).from('schedules').delete().eq('id', id)
    load()
  }

  const grouped = schedules.reduce((acc, s) => {
    if (!acc[s.month]) acc[s.month] = []
    acc[s.month].push(s)
    return acc
  }, {} as Record<number, Schedule[]>)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-amber-800">특우회 일정 관리</h1>
          <p className="text-jci-muted text-sm mt-1">총 {schedules.length}개</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-medium hover:bg-amber-600">
          <Plus size={18} /> 일정 추가
        </button>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
          const ms = grouped[month] || []
          if (ms.length === 0) return null
          return (
            <div key={month} className="bg-white rounded-xl border border-jci-border overflow-hidden">
              <div className="px-4 py-3 bg-amber-50 border-b border-jci-border font-bold text-amber-800 text-sm">
                {MONTHS[month - 1]}
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-jci-border">
                  {ms.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 w-12 text-center font-bold text-amber-500">{s.day || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-jci-800">{s.title}</div>
                        {s.description && <div className="text-xs text-jci-muted">{s.description}</div>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => { setEditing(s); setShowForm(true) }}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-jci-muted hover:text-amber-600 inline-block">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-jci-muted hover:text-red-600 inline-block ml-1">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>

      {showForm && (
        <ScheduleFormModal schedule={editing} onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); load() }} />
      )}
    </div>
  )
}

function ScheduleFormModal({ schedule, onClose, onSaved }: {
  schedule: Schedule | null; onClose: () => void; onSaved: () => void
}) {
  const [form, setForm] = useState({
    month: schedule?.month || 1, day: schedule?.day || 0,
    title: schedule?.title || '', description: schedule?.description || '',
    is_important: schedule?.is_important || false,
  })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data: years } = await (supabase as any).from('years').select('id').eq('is_current', true).single()
    if (!years) { setSaving(false); return }
    const payload = { ...form, year_id: years.id, order_index: schedule?.order_index || 0 }
    if (schedule) {
      await (supabase as any).from('schedules').update(payload).eq('id', schedule.id)
    } else {
      await (supabase as any).from('schedules').insert(payload)
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-jci-border">
          <h2 className="font-bold text-jci-800">{schedule ? '일정 수정' : '일정 추가'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">월 *</label>
              <select value={form.month} onChange={e => setForm({...form, month: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">일</label>
              <input type="number" min={0} max={31} value={form.day} onChange={e => setForm({...form, day: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">제목 *</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">설명</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_important} onChange={e => setForm({...form, is_important: e.target.checked})}
              className="rounded border-jci-border" />
            <span className="text-sm text-jci-800">중요 일정</span>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 border border-jci-border rounded-xl text-sm text-jci-muted hover:bg-gray-50">취소</button>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-medium hover:bg-amber-600 disabled:opacity-50">
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
