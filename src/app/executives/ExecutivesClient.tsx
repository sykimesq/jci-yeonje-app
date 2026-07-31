'use client'

import { cn } from '@/lib/utils'
import type { ExecutivePosition, Committee } from '@/lib/types'

const POSITION_GROUPS: Record<string, string> = {
  '회장': 'leader',
  '직전회장': 'leader',
  '내무부회장': 'leader',
  '외무부회장': 'leader',
  '감사': 'audit',
  '운영위원': 'staff',
  '기획위원': 'staff',
  '사무국장': 'staff',
  '총무이사': 'director',
  '재정이사': 'director',
  '내무이사': 'general_director',
  '외무이사': 'general_director',
  '홍보이사': 'general_director',
  '특우회담당이사': 'general_director',
  '회원확충분과위원장': 'committee',
  '지역사회개발분과위원장': 'committee',
}

export default function ExecutivesClient({
  positions,
  committees,
}: {
  positions: ExecutivePosition[]
  committees: Committee[]
}) {
  const leaderPositions = positions.filter(p => POSITION_GROUPS[p.position_name] === 'leader')
  const auditPositions = positions.filter(p => POSITION_GROUPS[p.position_name] === 'audit')
  const staffPositions = positions.filter(p => POSITION_GROUPS[p.position_name] === 'staff')
  const directorPositions = positions.filter(p => POSITION_GROUPS[p.position_name] === 'director')
  const generalDirectorPositions = positions.filter(p => POSITION_GROUPS[p.position_name] === 'general_director')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-jci-800">기구표</h1>
        <p className="text-jci-muted mt-1">2026년 부산연제청년회의소 임원진</p>
      </div>

      {/* Leadership */}
      <div className="mb-8">
        <div className="flex justify-center gap-6 mb-6">
          {leaderPositions.map((pos) => (
            <div key={pos.id} className="text-center">
              <div className={cn(
                'inline-flex items-center justify-center w-20 h-20 rounded-full mb-2',
                pos.position_name === '회장'
                  ? 'bg-gradient-to-br from-jci-500 to-jci-700 text-white shadow-lg'
                  : 'bg-jci-100 text-jci-700'
              )}>
                <span className="font-bold text-lg">{pos.member_name.charAt(0)}</span>
              </div>
              <div className="font-bold text-jci-800">{pos.member_name}</div>
              <div className="text-xs text-jci-muted">{pos.position_name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-jci-muted uppercase mb-3">감사</h2>
        <div className="flex gap-4">
          {auditPositions.map((pos) => (
            <div key={pos.id} className="bg-white rounded-xl border border-jci-border p-4 text-center flex-1">
              <div className="font-bold text-jci-800">{pos.member_name}</div>
              <div className="text-xs text-jci-muted">{pos.position_name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-jci-muted uppercase mb-3">운영위원 / 기획위원 / 사무국장</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {staffPositions.map((pos) => (
            <div key={pos.id} className="bg-white rounded-xl border border-jci-border p-3 text-center">
              <div className="font-medium text-jci-800 text-sm">{pos.member_name}</div>
              <div className="text-[10px] text-jci-muted">{pos.position_name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Directors (총무이사, 재정이사) */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-jci-muted uppercase mb-3">총무이사 / 재정이사</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {directorPositions.map((pos) => (
            <div key={pos.id} className="bg-white rounded-xl border border-jci-border p-3">
              <div className="font-medium text-jci-800 text-sm">{pos.member_name}</div>
              <div className="text-[10px] text-jci-muted">{pos.position_name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* General Directors (이사) */}
      {generalDirectorPositions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-jci-muted uppercase mb-3">이사</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {generalDirectorPositions.map((pos) => (
              <div key={pos.id} className="bg-white rounded-xl border border-jci-border p-3">
                <div className="font-medium text-jci-800 text-sm">{pos.member_name}</div>
                <div className="text-[10px] text-jci-muted">{pos.position_name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Committees */}
      {committees.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-jci-muted uppercase mb-3">분과위원회</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {committees.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-jci-border p-4">
                <div className="font-bold text-jci-800 text-sm mb-2">{c.name}</div>
                {c.chairperson && (
                  <div className="text-xs text-jci-muted mb-2">
                    위원장: <span className="font-medium text-jci-600">{c.chairperson}</span>
                  </div>
                )}
                {c.members && c.members.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {c.members.map((m, i) => (
                      <span key={i} className="text-[11px] bg-jci-50 text-jci-600 px-2 py-0.5 rounded-md">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
