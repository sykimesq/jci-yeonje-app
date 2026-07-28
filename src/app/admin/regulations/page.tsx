'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { Regulation } from '@/lib/types'

export default function AdminRegulationsPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Regulation | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: years } = await (supabase as any).from('years').select('id').eq('is_current', true).single()
    if (!years) return
    const { data } = await (supabase as any).from('regulations').select('*').eq('year_id', years.id).order('order_index')
    if (data) setRegulations(data)
  }

  async function handleDelete(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await (supabase as any).from('regulations').delete().eq('id', id)
    load()
  }

  const grouped = regulations.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {} as Record<string, Regulation[]>)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jci-800">정관 관리</h1>
          <p className="text-jci-muted text-sm mt-1">총 {regulations.length}개</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-jci-500 text-white rounded-xl text-sm font-medium hover:bg-jci-600">
          <Plus size={18} /> 항목 추가
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="bg-white rounded-xl border border-jci-border overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-jci-border font-bold text-jci-800 text-sm flex items-center justify-between">
              <span>{cat}</span>
              <span className="text-xs text-jci-muted font-normal">{items.length}개</span>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-jci-border">
                {items.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-jci-800">{r.title}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditing(r); setShowForm(true) }}
                        className="p-1.5 rounded-lg hover:bg-jci-50 text-jci-muted hover:text-jci-600 inline-block">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(r.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-jci-muted hover:text-red-600 inline-block ml-1">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {showForm && (
        <RegulationFormModal
          regulation={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); load() }}
        />
      )}
    </div>
  )
}

function RegulationFormModal({ regulation, onClose, onSaved }: {
  regulation: Regulation | null; onClose: () => void; onSaved: () => void
}) {
  const [form, setForm] = useState({
    category: regulation?.category || '',
    title: regulation?.title || '',
    content: regulation?.content || '',
  })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data: years } = await (supabase as any).from('years').select('id').eq('is_current', true).single()
    if (!years) { setSaving(false); return }
    const payload = { ...form, year_id: years.id, order_index: regulation?.order_index || 0 }
    if (regulation) {
      await (supabase as any).from('regulations').update(payload).eq('id', regulation.id)
    } else {
      await (supabase as any).from('regulations').insert(payload)
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-jci-border">
          <h2 className="font-bold text-jci-800">{regulation ? '항목 수정' : '항목 추가'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">카테고리 *</label>
            <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} required
              placeholder="회원 규정, 총회 규정, 임원 규정..."
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">제목 *</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">내용</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300 font-mono" />
          </div>
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
