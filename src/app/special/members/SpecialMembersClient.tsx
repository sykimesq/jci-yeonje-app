'use client'

import { useState, useMemo } from 'react'
import MemberCard from '@/components/MemberCard'
import { Search, X } from 'lucide-react'
import type { Member } from '@/lib/types'
import { MEMBER_TYPE_LABELS } from '@/lib/types'
import { cn } from '@/lib/utils'

const TABS = [
  { key: 'all', label: '전체' },
  { key: 'special', label: '특우회원' },
  { key: 'honorary', label: '명예회원' },
  { key: 'junior', label: '준회원' },
]

export default function SpecialMembersClient({ members }: { members: Member[] }) {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const filtered = useMemo(() => {
    let list = members
    if (activeTab !== 'all') {
      list = list.filter(m => m.member_type === activeTab)
    }
    if (!search.trim()) return list
    const q = search.trim().toLowerCase()
    return list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.name_hanja?.toLowerCase().includes(q) ||
      m.workplace?.toLowerCase().includes(q) ||
      m.jc_roles?.some(r => r.toLowerCase().includes(q))
    )
  }, [members, activeTab, search])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-800">특우회 명단</h1>
        <p className="text-jci-muted mt-1">연제JC특우회 회원 정보 (총 {members.length}명)</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab.key
                ? 'bg-amber-500 text-white'
                : 'bg-white text-jci-muted hover:text-jci-800 border border-jci-border'
            )}
          >
            {tab.label}
            {tab.key !== 'all' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({members.filter(m => m.member_type === tab.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-jci-muted" />
        <input
          type="text"
          placeholder="이름, 직책, 회사명으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-jci-border rounded-xl
            text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-jci-muted hover:text-jci-800">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onClick={() => setSelectedMember(member)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-jci-muted">
          <p className="text-lg">검색 결과가 없습니다</p>
        </div>
      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {selectedMember.photo_url ? (
                  <img
                    src={selectedMember.photo_url}
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600
                    flex items-center justify-center text-white font-bold text-2xl">
                    {selectedMember.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-jci-800">{selectedMember.name}</h2>
                  {selectedMember.name_hanja && (
                    <p className="text-sm text-jci-muted">{selectedMember.name_hanja}</p>
                  )}
                  {selectedMember.name_english && (
                    <p className="text-sm text-jci-muted">{selectedMember.name_english}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {selectedMember.birth_date && (
                  <div>
                    <label className="text-xs font-medium text-jci-muted uppercase">생년월일</label>
                    <p className="text-sm text-jci-800">{selectedMember.birth_date}</p>
                  </div>
                )}
                {selectedMember.phone && (
                  <div>
                    <label className="text-xs font-medium text-jci-muted uppercase">연락처</label>
                    <p className="text-sm text-jci-800">{selectedMember.phone}</p>
                  </div>
                )}
                {selectedMember.workplace && (
                  <div>
                    <label className="text-xs font-medium text-jci-muted uppercase">직장</label>
                    <p className="text-sm text-jci-800">
                      {selectedMember.workplace}
                      {selectedMember.position_in_company && ` / ${selectedMember.position_in_company}`}
                    </p>
                  </div>
                )}
                {selectedMember.address && (
                  <div>
                    <label className="text-xs font-medium text-jci-muted uppercase">주소</label>
                    <p className="text-sm text-jci-800">{selectedMember.address}</p>
                  </div>
                )}
                {selectedMember.jc_roles && selectedMember.jc_roles.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-jci-muted uppercase">JC 경력</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMember.jc_roles.map((role, i) => (
                        <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">{role}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedMember.jc_awards && selectedMember.jc_awards.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-jci-muted uppercase">포상 내역</label>
                    <ul className="mt-1 space-y-1">
                      {selectedMember.jc_awards.map((award, i) => (
                        <li key={i} className="text-sm text-jci-800 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">★</span>
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
