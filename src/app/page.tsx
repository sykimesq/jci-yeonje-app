import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import YearSelector from '@/components/YearSelector'
import { Users, Calendar, ScrollText, History, Building2, BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

const cards = [
  { href: '/members', label: '회원명부', desc: '정회원 및 특우회원 정보', icon: Users, color: 'from-blue-500 to-blue-600' },
  { href: '/executives', label: '기구표', desc: '2026년 임원진 구성', icon: Building2, color: 'from-emerald-500 to-emerald-600' },
  { href: '/schedules', label: '연간일정', desc: '2026년 주요 행사 일정', icon: Calendar, color: 'from-amber-500 to-amber-600' },
  { href: '/past-presidents', label: '역대회장', desc: '연제JC 47년의 역사', icon: History, color: 'from-purple-500 to-purple-600' },
  { href: '/regulations', label: '정관/규정', desc: '회원 규정 및 제 규정', icon: BookOpen, color: 'from-rose-500 to-rose-600' },
]

export default async function Home() {
  const supabase = await createClient()
  const { data: years } = await (supabase as any)
    .from('years')
    .select('id, year, slogan, is_current')
    .order('year', { ascending: false })
    .limit(1)

  const currentYear = years?.[0]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-jci-500 via-jci-600 to-jci-800 p-8 md:p-12 mb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm">
              {currentYear?.year || '2026'}년 회원수첩
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            부산연제청년회의소
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium">
            &ldquo;{currentYear?.slogan || '멈추지 않는 가치, 지키는 것이 혁신이다'}&rdquo;
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/members"
              className="px-5 py-2.5 bg-white text-jci-600 rounded-xl font-medium text-sm
                hover:bg-white/90 transition-colors shadow-sm"
            >
              회원명부 보기
            </Link>
            <Link
              href="/executives"
              className="px-5 py-2.5 bg-white/10 text-white rounded-xl font-medium text-sm
                hover:bg-white/20 transition-colors border border-white/20"
            >
              기구표 보기
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-white rounded-xl border border-jci-border p-5
              hover:border-jci-300 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color}
              flex items-center justify-center mb-3`}>
              <card.icon size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-jci-800 group-hover:text-jci-600 transition-colors">
              {card.label}
            </h3>
            <p className="text-sm text-jci-muted mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>

      {/* JCI Creed */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">JCI 신조</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-jci-600 mb-2">한국어</h3>
            <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
              <p>신앙은 인간생활에 의의와 목적을 부여하며,</p>
              <p>인류는 국경을 초월하여 형제가 될 수 있으며,</p>
              <p>경제적 정의는 자유기업을 통해서 자유인에 의하여 최선으로 달성되며,</p>
              <p>정치는 법률에 기반을 두며, 인간의 자의로 행해질 수 없으며,</p>
              <p>이 지구상의 가장 위대한 보배가 인간의 개성속에 있으며,</p>
              <p>인류에의 봉사가 인생의 가장 아름다운 사업임을 우리는 믿는다.</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-jci-600 mb-2">English</h3>
            <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
              <p>That faith in God gives meaning and purpose to human life;</p>
              <p>That the brotherhood of man transcends the sovereignty of nations;</p>
              <p>That economic justice can best be won by free men through free enterprise;</p>
              <p>That Government should be of laws rather than of men;</p>
              <p>That Earth&apos;s great treasure lies in human personality;</p>
              <p>and That service to Humanity is the best work of life.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
