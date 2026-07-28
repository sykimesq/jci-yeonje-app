import { createAdminClient } from '@/lib/supabase/admin'
import { Users, Calendar, UserCheck, UserCog } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  const supabase = createAdminClient()

  const { data: years } = await (supabase as any)
    .from('years')
    .select('id, year, slogan, is_current')
    .order('year', { ascending: false })
    .limit(1)

  const yearId = years?.[0]?.id || ''

  const { count: totalMembers } = await (supabase as any)
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('year_id', yearId)

  const { count: regularMembers } = await (supabase as any)
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('year_id', yearId)
    .eq('member_type', 'regular')

  const { count: specialMembers } = await (supabase as any)
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('year_id', yearId)
    .eq('member_type', 'special')

  const { count: schedules } = await (supabase as any)
    .from('schedules')
    .select('*', { count: 'exact', head: true })
    .eq('year_id', yearId)

  return { years, totalMembers: totalMembers || 0, regularMembers: regularMembers || 0, specialMembers: specialMembers || 0, schedules: schedules || 0 }
}

export default async function AdminDashboardPage() {
  const { years, totalMembers, regularMembers, specialMembers, schedules } = await getStats()
  const currentYear = years?.[0]

  const stats = [
    { label: '전체 회원', value: totalMembers, icon: Users, color: 'from-blue-500 to-blue-600', href: '/admin/members' },
    { label: '정회원', value: regularMembers, icon: UserCheck, color: 'from-emerald-500 to-emerald-600', href: '/admin/members' },
    { label: '특우회원', value: specialMembers, icon: UserCog, color: 'from-amber-500 to-amber-600', href: '/admin/members' },
    { label: '연간 일정', value: schedules, icon: Calendar, color: 'from-purple-500 to-purple-600', href: '/admin/schedules' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-jci-800">대시보드</h1>
        <p className="text-jci-muted mt-1">
          {currentYear ? `${currentYear.year}년 - ${currentYear.slogan}` : '연도 정보 없음'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-jci-border p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color}
                flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-jci-800">{stat.value}</div>
            <div className="text-sm text-jci-muted">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-jci-border p-6">
        <h2 className="font-bold text-jci-800 mb-4">바로가기</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/admin/members" className="p-3 rounded-xl bg-jci-50 text-jci-600 text-sm font-medium hover:bg-jci-100 transition-colors text-center">
            회원 관리
          </Link>
          <Link href="/admin/executives" className="p-3 rounded-xl bg-jci-50 text-jci-600 text-sm font-medium hover:bg-jci-100 transition-colors text-center">
            임원진 관리
          </Link>
          <Link href="/admin/schedules" className="p-3 rounded-xl bg-jci-50 text-jci-600 text-sm font-medium hover:bg-jci-100 transition-colors text-center">
            일정 관리
          </Link>
          <Link href="/admin/past-presidents" className="p-3 rounded-xl bg-jci-50 text-jci-600 text-sm font-medium hover:bg-jci-100 transition-colors text-center">
            역대회장
          </Link>
          <Link href="/admin/regulations" className="p-3 rounded-xl bg-jci-50 text-jci-600 text-sm font-medium hover:bg-jci-100 transition-colors text-center">
            정관 관리
          </Link>
          <Link href="/admin/years" className="p-3 rounded-xl bg-jci-50 text-jci-600 text-sm font-medium hover:bg-jci-100 transition-colors text-center">
            연도 관리
          </Link>
        </div>
      </div>
    </div>
  )
}
