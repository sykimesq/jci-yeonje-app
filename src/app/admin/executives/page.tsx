'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, X } from 'lucide-react'
import type { ExecutivePosition } from '@/lib/types'

export default function AdminExecutivesPage() {
  const [positions, setPositions] = useState<ExecutivePosition[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ExecutivePosition | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: years } = await (supabase as any).from('years').select('id').eq('is_current', true).single()
    if (!years) return
    const { data } = await (supabase as any).from('executive_positions').select('*').eq('year_id', years.id).order('order_index')
    if (data) setPositions(data)
  }

  async function handleDelete(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await (supabase as any).from('executive_positions').delete().eq('id', id)
    load()
  }

  async function moveItem(id: string, direction: 'up' | 'down') {
    const idx = positions.findIndex(p => p.id === id)
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === positions.length - 1) return
    const target = direction === 'up' ? idx - 1 : idx + 1
    const items = [...positions]
    ;[items[idx], items[target]] = [items[target], items[idx]]
    for (let i = 0; i < items.length; i++) {
      await (supabase as any).from('executive_positions').update({ order_index: i }).eq('id', items[i].id)
    }
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jci-800">임원진 관리</h1>
          <p className="text-jci-muted text-sm mt-1">총 {positions.length}명</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-jci-500 text-white rounded-xl text-sm font-medium hover:bg-jci-600">
          <Plus size={18} /> 임원 추가
        </button>
      </div>

      <div className="bg-white rounded-xl border border-jci-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-jci-border bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-jci-muted w-20">순서</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted">직책</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted">이름</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted hidden md:table-cell">한자</th>
              <th className="text-right px-4 py-3 font-medium text-jci-muted">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-jci-border">
            {positions.map((p, i) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveItem(p.id, 'up')} disabled={i === 0}
                      className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-30"><ArrowUp size={14} /></button>
                    <span className="text-xs text-jci-muted w-4 text-center">{i + 1}</span>
                    <button onClick={() => moveItem(p.id, 'down')} disabled={i === positions.length - 1}
                      className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-30"><ArrowDown size={14} /></button>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-jci-800">{p.position_name}</td>
                <td className="px-4 py-3 text-jci-800">{p.member_name}</td>
                <td className="px-4 py-3 text-jci-muted hidden md:table-cell">{p.member_hanja}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setEditing(p); setShowForm(true) }}
                    className="p-1.5 rounded-lg hover:bg-jci-50 text-jci-muted hover:text-jci-600 inline-block">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-jci-muted hover:text-red-600 inline-block ml-1">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ExecutiveFormModal
          position={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); load() }}
        />
      )}
    </div>
  )
}

function ExecutiveFormModal({ position, onClose, onSaved }: {
  position: ExecutivePosition | null; onClose: () => void; onSaved: () => void
}) {
  const [form, setForm] = useState({
    position_name: position?.position_name || '',
    member_name: position?.member_name || '',
    member_hanja: position?.member_hanja || '',
    member_english: position?.member_english || '',
  })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data: years } = await (supabase as any).from('years').select('id').eq('is_current', true).single()
    if (!years) { setSaving(false); return }
    const payload = { ...form, year_id: years.id, order_index: position?.order_index || 0 }
    if (position) {
      await (supabase as any).from('executive_positions').update(payload).eq('id', position.id)
    } else {
      await (supabase as any).from('executive_positions').insert(payload)
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-jci-border">
          <h2 className="font-bold text-jci-800">{position ? '임원 수정' : '임원 추가'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">직책 *</label>
            <input value={form.position_name} onChange={e => setForm({...form, position_name: e.target.value})} required
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">이름 *</label>
            <input value={form.member_name} onChange={e => setForm({...form, member_name: e.target.value})} required
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">한자</label>
              <input value={form.member_hanja} onChange={e => setForm({...form, member_hanja: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">영문</label>
              <input value={form.member_english} onChange={e => setForm({...form, member_english: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
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
