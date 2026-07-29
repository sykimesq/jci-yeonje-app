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

      {/* JCI Mission */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">JCI 미션</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-jci-600 mb-2">한국어</h3>
            <div className="text-sm text-jci-muted leading-relaxed">
              <p>청년들에게 긍정적인 변화를 만들 수 있는 리더십 개발의 기회를 제공한다.</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-jci-600 mb-2">English</h3>
            <div className="text-sm text-jci-muted leading-relaxed">
              <p>To provide young people with leadership development opportunities that create positive change.</p>
            </div>
          </div>
        </div>
      </div>

      {/* JCI Vision */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">JCI 비전</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-jci-600 mb-2">한국어</h3>
            <div className="text-sm text-jci-muted leading-relaxed">
              <p>청년 리더들의 선도적인 글로벌 네트워크를 구축한다.</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-jci-600 mb-2">English</h3>
            <div className="text-sm text-jci-muted leading-relaxed">
              <p>To be the leading global network of young leaders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* JCI Korea 강령 */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">한국JC 강령</h2>
        <div className="text-sm text-jci-muted leading-relaxed space-y-1">
          <p>우리는</p>
          <p>시대적, 사회적 사명을 자각하고</p>
          <p>JC 본연의 이념을 같이하는</p>
          <p>청년들의 웅지와 정열을 한데모아</p>
          <p>자주적, 자립적, 자발적 실천력으로</p>
          <p>복지사회 건설과 세계평화를 이룩하는 데</p>
          <p>총력을 다한다.</p>
        </div>
      </div>

      {/* 한국JC 노래 */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">한국JC 노래</h2>
        <div className="text-sm text-jci-muted mb-4">
          <p>황우겸 작사 / 김광수 작곡</p>
        </div>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/한국jc음악악보.jpg"
            alt="한국JC 노래 악보"
            className="max-w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* 한국청년회의소 */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">한국청년회의소</h2>
        <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
          <p><span className="font-medium text-jci-700">사무국 :</span> ㉾133-847 서울시 성동구 용답동 228-2번지 한국JC회관 4층</p>
          <p><span className="font-medium text-jci-700">전 화 :</span> (02)2244-9521</p>
          <p><span className="font-medium text-jci-700">팩 스 :</span> (02)2245-5883</p>
          <p><span className="font-medium text-jci-700">홈페이지 :</span> www.koreajc.or.kr</p>
          <p><span className="font-medium text-jci-700">E-mail :</span> webmaster@koreajc.or.kr</p>
        </div>
      </div>

      {/* 부산지구청년회의소 롬 사무국 */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">부산지구청년회의소 롬 사무국</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-jci-500 text-white">
                <th className="text-left px-3 py-2 rounded-tl-lg">LOM</th>
                <th className="text-left px-3 py-2">주소</th>
                <th className="text-left px-3 py-2 rounded-tr-lg">전화/팩스</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jci-border">
              {[
                ['부산지구', '진구 전포대로 179, 보해이브빌 2층', 'T 647-0904 / F 647-0906'],
                ['부산', '남구 지게골로 52-15, 벽산한성기린상가 3층 301호', 'T 631-0044 / F 631-0046'],
                ['북부산', '진구 전포대로 179, 보해이브빌 203호', 'T 806-7868 / F 816-2752'],
                ['동부산', '동구 고관로 173, 동원드림타운 상가 3F', 'T 635-9001 / F 645-9007'],
                ['부산동래', '동래구 충렬대로 306 한양@ 상가B동 221호', 'T 555-6137 / F 557-0122'],
                ['남부산', '남구 신선로 458, 304호', 'T 313-4442 / F 324-4442'],
                ['부산사상', '사상구 백양대로 458, 1호 통일상가 2층', 'T 313-4442 / F 324-4442'],
                ['부산해운대', '해운대구 좌동순환로 427, 2층', 'T 741-5295 / F 741-5291'],
                ['중부산', '중구 중앙동5가 11-1 동흥B/D 403', 'T 465-4742 / F -'],
                ['부산진', '진구 신암로 70, 서면항도타워 상가B 3층', 'T 817-1860 / F 817-1861'],
                ['부산동북', '진구 신암로 32 경남@상가 3층 305호', 'T 634-4567 / F 635-3453'],
                ['부산서면', '진구 전포대로 179 보해이브빌 205호', 'T - / F -'],
                ['부산항도', '진구 신암로 72, 항도타워상가 B동 3층', 'T 636-0400 / F 636-0401'],
                ['부산금정', '금정구 식물원로75번길 33 경보상가 302', 'T 508-7064~5 / F 508-7066'],
                ['부산수영', '수영구 광안해변로 399, 민락씨랜드 3층', 'T 806-7868 / F 816-2752'],
                ['부산연제', '연제구 거제3동 38-45 경남@상가 2F 5호', 'T 755-0771 / F 755-1046'],
                ['부산서부', '서구 까치고개로233번길 21 태양빌딩 5층', 'T 244-5550 / F -'],
                ['부산기장', '기장군 기장읍 차성로 290 동양프라자 403호', 'T 721-0450 / F 721-0715'],
                ['부산강서', '강서구 대저로 105-1 2층', 'T 271-3060 / F 271-3061'],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-3 py-2 font-medium text-jci-800 whitespace-nowrap">{row[0]}</td>
                  <td className="px-3 py-2 text-jci-muted">{row[1]}</td>
                  <td className="px-3 py-2 text-jci-muted whitespace-nowrap">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 형제JC */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">형제JC</h2>
        <div className="bg-jci-bg rounded-xl p-5">
          <h3 className="font-bold text-jci-800 mb-3">삼천포청년회의소</h3>
          <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
            <p><span className="font-medium text-jci-700">사무국 :</span> ㉾52562 경남 사천시 숲뫼1길 47(향촌동)</p>
            <p><span className="font-medium text-jci-700">전 화 :</span> (055)833-3672</p>
            <p><span className="font-medium text-jci-700">팩 스 :</span> (055)832-4193</p>
            <p><span className="font-medium text-jci-700">홈페이지 :</span> www.samcheonpojc.org</p>
            <p><span className="font-medium text-jci-700">E-mail :</span> skyju07@naver.com</p>
          </div>
        </div>
      </div>

      {/* 우호JC */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">우호JC</h2>
        <div className="bg-jci-bg rounded-xl p-5">
          <h3 className="font-bold text-jci-800 mb-3">서울강서청년회의소</h3>
          <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
            <p><span className="font-medium text-jci-700">사무국 :</span> ㉾07528 서울 강서구 양천로 401 강서한강자이 B동</p>
            <p><span className="font-medium text-jci-700">전 화 :</span> (02)2603-0873</p>
            <p><span className="font-medium text-jci-700">팩 스 :</span> (02)2693-9943</p>
            <p><span className="font-medium text-jci-700">홈페이지 :</span> http://club.cyworld.com/gs-jci</p>
            <p><span className="font-medium text-jci-700">E-mail :</span> leehisuk2@nate.com</p>
          </div>
        </div>
      </div>

      {/* 해외자매 JC */}
      <div className="bg-white rounded-xl border border-jci-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-jci-800 mb-4">해외자매 JC</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-jci-bg rounded-xl p-5">
            <h3 className="font-bold text-rose-600 mb-3">대만 대송산JC</h3>
            <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
              <p><span className="font-medium text-jci-700">담당 :</span> 陳琮勳 Sean Chen</p>
              <p><span className="font-medium text-jci-700">주소 :</span> 台北市 八德路 四段 463號 2F</p>
              <p><span className="font-medium text-jci-700">전화 :</span> T:2768-7739</p>
              <p><span className="font-medium text-jci-700">팩스 :</span> F:2764-4374</p>
            </div>
          </div>
          <div className="bg-jci-bg rounded-xl p-5">
            <h3 className="font-bold text-rose-600 mb-3">일본 히라즈까JC</h3>
            <div className="text-sm text-jci-muted space-y-1.5 leading-relaxed">
              <p><span className="font-medium text-jci-700">담당 :</span> 尾崎 圭記</p>
              <p><span className="font-medium text-jci-700">주소 :</span> 神奈川 平塚市 松風町2番10號</p>
              <p><span className="font-medium text-jci-700">전화 :</span> T:0463-21-6474</p>
              <p><span className="font-medium text-jci-700">팩스 :</span> F:0463-21-7393</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
