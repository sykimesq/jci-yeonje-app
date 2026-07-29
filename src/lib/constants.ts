export const NAV_ITEMS = [
  { label: '홈', href: '/' },
  { label: '회원명부', href: '/members' },
  { label: '기구표', href: '/executives' },
  { label: '연간일정', href: '/schedules' },
  { label: '역대회장', href: '/past-presidents' },
  { label: '정관/규정', href: '/regulations' },
]

export const SPECIAL_NAV_ITEMS = [
  { label: '특우회 홈', href: '/special' },
  { label: '특우회 명단', href: '/special/members' },
  { label: '특우회 역대회장', href: '/special/past-presidents' },
  { label: '특우회 정관', href: '/special/regulations' },
]

export const ADMIN_NAV_ITEMS = [
  { label: '대시보드', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: '회원 관리', href: '/admin/members', icon: 'Users' },
  { label: '임원진 관리', href: '/admin/executives', icon: 'Briefcase' },
  { label: '일정 관리', href: '/admin/schedules', icon: 'Calendar' },
  { label: '역대회장', href: '/admin/past-presidents', icon: 'History' },
  { label: '정관 관리', href: '/admin/regulations', icon: 'FileText' },
  { label: '연도 관리', href: '/admin/years', icon: 'CalendarDays' },
]

export const MONTHS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
]

export const POSITION_LABELS: Record<string, string> = {
  president: '회장',
  immediate_past_president: '직전회장',
  internal_vp: '내무부회장',
  external_vp: '외무부회장',
  auditor: '감사',
  secretary_general: '사무국장',
  planning: '기획위원',
  operating: '운영위원',
  internal_director: '내무이사',
  external_director: '외무이사',
  public_relations: '홍보이사',
  general_affairs: '총무이사',
  finance: '재정이사',
  special_committee: '특우회담당이사',
  membership: '회원확충분과위원장',
  community: '지역사회개발분과위원장',
}
