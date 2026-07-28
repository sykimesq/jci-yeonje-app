'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { PastPresident, SpecialPastPresident } from '@/lib/types'

export default function AdminPastPresidentsPage() {
  const [presidents, setPresidents] = useState<PastPresident[]>([])
  const [specialPresidents, setSpecialPresidents] = useState<SpecialPastPresident[]>([])
  const [tab, setTab] = useState<'regular' | 'special'>('regular')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: p } = await (supabase as any).from('past_presidents').select('*').order('order_index')
    if (p) setPresidents(p)
    const { data: sp } = await (supabase as any).from('special_past_presidents').select('*').order('order_index')
    if (sp) setSpecialPresidents(sp)
  }

  async function handleDelete(id: string, table: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await (supabase as any).from(table as any).delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jci-800">역대회장 관리</h1>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-jci-500 text-white rounded-xl text-sm font-medium hover:bg-jci-600">
          <Plus size={18} /> 추가
        </button>
      </div>

      <div className="flex gap-1 mb-4">
        <button onClick={() => setTab('regular')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'regular' ? 'bg-jci-500 text-white' : 'bg-white text-jci-muted border border-jci-border'}`}>
          JC 역대회장 ({presidents.length})
        </button>
        <button onClick={() => setTab('special')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'special' ? 'bg-jci-500 text-white' : 'bg-white text-jci-muted border border-jci-border'}`}>
          특우회 역대회장 ({specialPresidents.length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-jci-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-jci-border bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-jci-muted">대</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted">이름</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted hidden md:table-cell">한자</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted hidden md:table-cell">임기</th>
              <th className="text-right px-4 py-3 font-medium text-jci-muted">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-jci-border">
            {(tab === 'regular' ? presidents : specialPresidents).map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-bold text-jci-500">{item.generation}</td>
                <td className="px-4 py-3 font-medium text-jci-800">{item.name}</td>
                <td className="px-4 py-3 text-jci-muted hidden md:table-cell">{item.name_hanja}</td>
                <td className="px-4 py-3 text-jci-muted hidden md:table-cell">{item.term_years || '-'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setEditing({ ...item, _table: tab === 'regular' ? 'past_presidents' : 'special_past_presidents' }); setShowForm(true) }}
                    className="p-1.5 rounded-lg hover:bg-jci-50 text-jci-muted hover:text-jci-600 inline-block">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id, tab === 'regular' ? 'past_presidents' : 'special_past_presidents')}
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
        <PresidentFormModal
          president={editing}
          isSpecial={tab === 'special'}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); load() }}
        />
      )}
    </div>
  )
}

function PresidentFormModal({ president, isSpecial, onClose, onSaved }: {
  president: any; isSpecial: boolean; onClose: () => void; onSaved: () => void
}) {
  const [form, setForm] = useState({
    generation: president?.generation || '',
    name: president?.name || '',
    name_hanja: president?.name_hanja || '',
    term_years: president?.term_years || '',
    is_deceased: president?.is_deceased || false,
  })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const table = isSpecial ? 'special_past_presidents' : 'past_presidents'
    const payload: any = {
      name: form.name,
      name_hanja: form.name_hanja,
      is_deceased: form.is_deceased,
      order_index: president?.order_index || 0,
    }
    if (isSpecial) {
      payload.generation = form.generation
    } else {
      payload.generation = Number(form.generation)
      payload.term_years = form.term_years
    }
    if (president?.id) {
      await (supabase as any).from(table as any).update(payload).eq('id', president.id)
    } else {
      await (supabase as any).from(table as any).insert(payload)
    }
    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-jci-border">
          <h2 className="font-bold text-jci-800">{president?.id ? '수정' : '추가'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">대 *</label>
              <input value={form.generation} onChange={e => setForm({...form, generation: e.target.value})} required
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">이름 *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">한자</label>
              <input value={form.name_hanja} onChange={e => setForm({...form, name_hanja: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            {!isSpecial && (
              <div>
                <label className="block text-xs font-medium text-jci-muted mb-1">임기</label>
                <input value={form.term_years} onChange={e => setForm({...form, term_years: e.target.value})} placeholder="79~80"
                  className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
              </div>
            )}
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_deceased} onChange={e => setForm({...form, is_deceased: e.target.checked})}
              className="rounded border-jci-border" />
            <span className="text-sm text-jci-800">고인 (故)</span>
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
