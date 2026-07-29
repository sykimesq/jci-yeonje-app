import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, History, FileText, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SpecialPage() {
  const supabase = await createClient()

  const { data: members } = await (supabase as any)
    .from('members')
    .select('id, name, name_hanja, member_type')
    .eq('member_type', 'special')
    .order('order_index', { ascending: true })

  const { data: specialPresidents } = await (supabase as any)
    .from('special_past_presidents')
    .select('*')
    .order('order_index', { ascending: true })

  const memberCount = members?.length || 0
  const presidentCount = specialPresidents?.length || 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-8 md:p-12 mb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm">
              특우회
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            연제JC특우회
          </h1>
          <p className="text-lg text-white/80">
            부산연제청년회의소 OB 모임 — 연제JC의 역사와 전통을 이어갑니다
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/special/members"
          className="group bg-white rounded-xl border border-jci-border p-6
            hover:border-amber-300 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600
            flex items-center justify-center mb-3">
            <Users size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-jci-800 group-hover:text-amber-600 transition-colors">
            특우회 명단
          </h3>
          <p className="text-sm text-jci-muted mt-1">
            특우회원 {memberCount}명의 정보를 확인하세요
          </p>
          <div className="flex items-center gap-1 mt-3 text-sm font-medium text-amber-600">
            <span>명단 보기</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          href="/special/past-presidents"
          className="group bg-white rounded-xl border border-jci-border p-6
            hover:border-amber-300 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600
            flex items-center justify-center mb-3">
            <History size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-jci-800 group-hover:text-amber-600 transition-colors">
            특우회 역대회장
          </h3>
          <p className="text-sm text-jci-muted mt-1">
            특우회 역대회장 {presidentCount}분의 기록
          </p>
          <div className="flex items-center gap-1 mt-3 text-sm font-medium text-amber-600">
            <span>역대회장 보기</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          href="/special/regulations"
          className="group bg-white rounded-xl border border-jci-border p-6
            hover:border-amber-300 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600
            flex items-center justify-center mb-3">
            <FileText size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-jci-800 group-hover:text-amber-600 transition-colors">
            특우회 정관/규정
          </h3>
          <p className="text-sm text-jci-muted mt-1">
            연제JC특우회 정관, 경조 규정, 포상 규정
          </p>
          <div className="flex items-center gap-1 mt-3 text-sm font-medium text-amber-600">
            <span>정관 보기</span>
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  )
}
