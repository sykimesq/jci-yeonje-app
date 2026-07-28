'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, X, Check } from 'lucide-react'
import type { Year } from '@/lib/types'

export default function AdminYearsPage() {
  const [years, setYears] = useState<Year[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Year | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase as any).from('years').select('*').order('year', { ascending: false })
    if (data) setYears(data)
  }

  async function setCurrent(yearId: string) {
    await (supabase as any).from('years').update({ is_current: false }).neq('id', yearId)
    await (supabase as any).from('years').update({ is_current: true }).eq('id', yearId)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까? (연관된 모든 데이터가 삭제됩니다)')) return
    await (supabase as any).from('years').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jci-800">연도 관리</h1>
          <p className="text-jci-muted text-sm mt-1">매년 새로운 수첩 데이터를 관리합니다</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-jci-500 text-white rounded-xl text-sm font-medium hover:bg-jci-600">
          <Plus size={18} /> 연도 추가
        </button>
      </div>

      <div className="bg-white rounded-xl border border-jci-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-jci-border bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-jci-muted">연도</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted">슬로건</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted">상태</th>
              <th className="text-right px-4 py-3 font-medium text-jci-muted">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-jci-border">
            {years.map((y) => (
              <tr key={y.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-bold text-jci-800">{y.year}년</td>
                <td className="px-4 py-3 text-jci-muted max-w-xs truncate">{y.slogan}</td>
                <td className="px-4 py-3">
                  {y.is_current ? (
                    <span className="text-xs bg-jci-500 text-white px-2 py-0.5 rounded-full">현재</span>
                  ) : (
                    <button onClick={() => setCurrent(y.id)}
                      className="text-xs text-jci-muted hover:text-jci-600 underline">현재로 설정</button>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setEditing(y); setShowForm(true) }}
                    className="p-1.5 rounded-lg hover:bg-jci-50 text-jci-muted hover:text-jci-600 inline-block">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(y.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-jci-muted hover:text-red-600 inline-block ml-1">
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <YearFormModal
          year={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); load() }}
        />
      )}
    </div>
  )
}

function YearFormModal({ year, onClose, onSaved }: {
  year: Year | null; onClose: () => void; onSaved: () => void
}) {
  const [form, setForm] = useState({
    year: year?.year || new Date().getFullYear(),
    slogan: year?.slogan || '',
    is_current: year?.is_current || false,
  })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (year) {
      await (supabase as any).from('years').update(form).eq('id', year.id)
    } else {
      await (supabase as any).from('years').insert(form)
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-jci-border">
          <h2 className="font-bold text-jci-800">{year ? '연도 수정' : '연도 추가'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">연도 *</label>
            <input type="number" value={form.year} onChange={e => setForm({...form, year: Number(e.target.value)})} required
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">슬로건</label>
            <input value={form.slogan} onChange={e => setForm({...form, slogan: e.target.value})}
              placeholder="멈추지 않는 가치, 지키는 것이 혁신이다"
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_current} onChange={e => setForm({...form, is_current: e.target.checked})}
              className="rounded border-jci-border" />
            <span className="text-sm text-jci-800">현재 연도로 설정</span>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 border border-jci-border rounded-xl text-sm text-jci-muted hover:bg-gray-50">취소</button>
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-jci-500 text-white rounded-xl text-sm font-medium hover:bg-jci-600 disabled:opacity-50">
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
