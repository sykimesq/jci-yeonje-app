'use client'

import { cn } from '@/lib/utils'
import { MEMBER_TYPE_LABELS, MEMBER_TYPE_COLORS } from '@/lib/types'
import { Phone, MapPin, Briefcase } from 'lucide-react'
import type { Member } from '@/lib/types'

interface MemberCardProps {
  member: Member
  onClick?: () => void
}

export default function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-jci-border p-5
        hover:border-jci-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar / Photo */}
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-jci-100 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-jci-400 to-jci-600
            flex items-center justify-center text-white font-bold text-lg shrink-0">
            {member.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-jci-800 group-hover:text-jci-600 transition-colors">
              {member.name}
            </h3>
            {member.name_hanja && (
              <span className="text-xs text-jci-muted">({member.name_hanja})</span>
            )}
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', MEMBER_TYPE_COLORS[member.member_type])}>
              {MEMBER_TYPE_LABELS[member.member_type]}
            </span>
          </div>

          {member.jc_roles && member.jc_roles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {member.jc_roles.map((role, i) => (
                <span key={i} className="text-[11px] bg-jci-50 text-jci-600 px-2 py-0.5 rounded-md">
                  {role}
                </span>
              ))}
            </div>
          )}

          <div className="mt-2 space-y-1 text-sm text-jci-muted">
            {member.workplace && (
              <div className="flex items-center gap-1.5">
                <Briefcase size={13} />
                <span>{member.workplace}{member.position_in_company ? ` / ${member.position_in_company}` : ''}</span>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={13} />
                <span>{member.phone}</span>
              </div>
            )}
            {member.address && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin size={13} />
                <span className="truncate">{member.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
