'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { MEMBER_TYPE_LABELS } from '@/lib/types'
import type { Member } from '@/lib/types'
import PhotoUpload from '@/components/PhotoUpload'

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadMembers()
  }, [])

  async function loadMembers() {
    const { data: years } = await (supabase as any)
      .from('years')
      .select('id')
      .eq('is_current', true)
      .single()
    if (!years) return
    const { data } = await (supabase as any)
      .from('members')
      .select('*')
      .eq('year_id', years.id)
      .order('order_index', { ascending: true })
    if (data) setMembers(data)
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await (supabase as any).from('members').delete().eq('id', id)
    loadMembers()
  }

  const filtered = members.filter(m =>
    !search || m.name.includes(search) || m.name_hanja?.includes(search)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-jci-800">회원 관리</h1>
          <p className="text-jci-muted text-sm mt-1">총 {members.length}명</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-jci-500 text-white rounded-xl text-sm font-medium hover:bg-jci-600 transition-colors"
        >
          <Plus size={18} />
          회원 추가
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-jci-muted" />
        <input
          type="text"
          placeholder="이름 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-jci-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-jci-300"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-jci-muted">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-jci-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-jci-border bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-jci-muted">이름</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted hidden md:table-cell">한자</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted hidden md:table-cell">구분</th>
              <th className="text-left px-4 py-3 font-medium text-jci-muted hidden lg:table-cell">연락처</th>
              <th className="text-right px-4 py-3 font-medium text-jci-muted">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-jci-border">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-jci-800">{m.name}</td>
                <td className="px-4 py-3 text-jci-muted hidden md:table-cell">{m.name_hanja}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs bg-jci-50 text-jci-600 px-2 py-0.5 rounded-full">
                    {MEMBER_TYPE_LABELS[m.member_type]}
                  </span>
                </td>
                <td className="px-4 py-3 text-jci-muted hidden lg:table-cell">{m.phone}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => { setEditing(m); setShowForm(true) }}
                    className="p-1.5 rounded-lg hover:bg-jci-50 text-jci-muted hover:text-jci-600 inline-block"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-jci-muted hover:text-red-600 inline-block ml-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <MemberFormModal
          member={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); loadMembers() }}
        />
      )}
    </div>
  )
}

function MemberFormModal({ member, onClose, onSaved }: { member: Member | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: member?.name || '',
    name_hanja: member?.name_hanja || '',
    name_english: member?.name_english || '',
    birth_date: member?.birth_date || '',
    phone: member?.phone || '',
    address: member?.address || '',
    workplace: member?.workplace || '',
    position_in_company: member?.position_in_company || '',
    workplace_address: member?.workplace_address || '',
    workplace_phone: member?.workplace_phone || '',
    workplace_fax: member?.workplace_fax || '',
    home_address: member?.home_address || '',
    member_type: (member?.member_type || 'regular') as any,
    jc_roles: member?.jc_roles?.join('\n') || '',
    jc_awards: member?.jc_awards?.join('\n') || '',
    photo_url: member?.photo_url || '',
  })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const { data: years } = await (supabase as any)
      .from('years')
      .select('id')
      .eq('is_current', true)
      .single()

    if (!years) { setSaving(false); return }

    const payload = {
      year_id: years.id,
      name: form.name,
      name_hanja: form.name_hanja,
      name_english: form.name_english,
      birth_date: form.birth_date,
      phone: form.phone,
      address: form.address,
      workplace: form.workplace,
      position_in_company: form.position_in_company,
      workplace_address: form.workplace_address,
      workplace_phone: form.workplace_phone,
      workplace_fax: form.workplace_fax,
      home_address: form.home_address,
      member_type: form.member_type as any,
      jc_roles: form.jc_roles.split('\n').filter(Boolean),
      jc_awards: form.jc_awards.split('\n').filter(Boolean),
      photo_url: form.photo_url,
      order_index: member?.order_index || 0,
    }

    if (member) {
      await (supabase as any).from('members').update(payload).eq('id', member.id)
    } else {
      await (supabase as any).from('members').insert(payload)
    }

    setSaving(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-jci-border">
          <h2 className="font-bold text-jci-800">{member ? '회원 수정' : '회원 추가'}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">이름 *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">한자</label>
              <input value={form.name_hanja} onChange={e => setForm({...form, name_hanja: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">영문</label>
              <input value={form.name_english} onChange={e => setForm({...form, name_english: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">생년월일</label>
              <input value={form.birth_date} onChange={e => setForm({...form, birth_date: e.target.value})} placeholder="1983.09.17"
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">휴대전화</label>
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">직장 주소</label>
            <input value={form.workplace_address} onChange={e => setForm({...form, workplace_address: e.target.value})}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">직장 전화</label>
              <input value={form.workplace_phone} onChange={e => setForm({...form, workplace_phone: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">직장 팩스</label>
              <input value={form.workplace_fax} onChange={e => setForm({...form, workplace_fax: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">집 주소</label>
            <input value={form.home_address} onChange={e => setForm({...form, home_address: e.target.value})}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">직장</label>
              <input value={form.workplace} onChange={e => setForm({...form, workplace: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-jci-muted mb-1">직위</label>
              <input value={form.position_in_company} onChange={e => setForm({...form, position_in_company: e.target.value})}
                className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">회원 사진</label>
            <PhotoUpload
              path={form.photo_url}
              onUpload={(url) => setForm({...form, photo_url: url})}
              onRemove={() => setForm({...form, photo_url: ''})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">회원 구분</label>
            <select value={form.member_type} onChange={e => setForm({...form, member_type: e.target.value})}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300">
              {Object.entries(MEMBER_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">JC 경력 (줄바꿈으로 구분)</label>
            <textarea value={form.jc_roles} onChange={e => setForm({...form, jc_roles: e.target.value})} rows={3}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
          </div>
          <div>
            <label className="block text-xs font-medium text-jci-muted mb-1">포상 내역 (줄바꿈으로 구분)</label>
            <textarea value={form.jc_awards} onChange={e => setForm({...form, jc_awards: e.target.value})} rows={3}
              className="w-full px-3 py-2 border border-jci-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-300" />
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
