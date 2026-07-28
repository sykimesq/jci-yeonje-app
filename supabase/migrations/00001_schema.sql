-- ============================================================
-- 연제JC 회원수첩 앱 - Supabase 스키마
-- ============================================================

-- 1. 연도
CREATE TABLE years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL UNIQUE,
  slogan TEXT NOT NULL DEFAULT '',
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. 회원
CREATE TYPE member_type AS ENUM ('regular', 'special', 'honorary', 'junior');

CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES years(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_hanja TEXT DEFAULT '',
  name_english TEXT DEFAULT '',
  birth_date TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  workplace TEXT DEFAULT '',
  position_in_company TEXT DEFAULT '',
  jc_roles TEXT[] DEFAULT '{}',
  jc_awards TEXT[] DEFAULT '{}',
  photo_url TEXT DEFAULT '',
  member_type member_type NOT NULL DEFAULT 'regular',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_members_year_id ON members(year_id);
CREATE INDEX idx_members_type ON members(member_type);

-- 3. 임원 직책
CREATE TABLE executive_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES years(id) ON DELETE CASCADE,
  position_name TEXT NOT NULL,
  member_name TEXT NOT NULL,
  member_hanja TEXT DEFAULT '',
  member_english TEXT DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_exec_positions_year_id ON executive_positions(year_id);

-- 4. 연간 일정
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES years(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  day INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  is_important BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_schedules_year_id ON schedules(year_id);
CREATE INDEX idx_schedules_month ON schedules(month);

-- 5. 역대회장
CREATE TABLE past_presidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generation INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_hanja TEXT DEFAULT '',
  term_years TEXT DEFAULT '',
  is_deceased BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. 정관/규정
CREATE TABLE regulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES years(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_regulations_year_id ON regulations(year_id);
CREATE INDEX idx_regulations_category ON regulations(category);

-- 7. 분과위원회
CREATE TABLE committees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES years(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  chairperson TEXT DEFAULT '',
  members TEXT[] DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_committees_year_id ON committees(year_id);

-- 8. 특우회 역대회장
CREATE TABLE special_past_presidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generation TEXT NOT NULL,
  name TEXT NOT NULL,
  name_hanja TEXT DEFAULT '',
  is_deceased BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- RLS (Row Level Security) 정책
-- ============================================================

-- 모든 테이블에 대해 public SELECT 허용
ALTER TABLE years ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE executive_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_presidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_past_presidents ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access - years" ON years FOR SELECT USING (true);
CREATE POLICY "Public read access - members" ON members FOR SELECT USING (true);
CREATE POLICY "Public read access - executive_positions" ON executive_positions FOR SELECT USING (true);
CREATE POLICY "Public read access - schedules" ON schedules FOR SELECT USING (true);
CREATE POLICY "Public read access - past_presidents" ON past_presidents FOR SELECT USING (true);
CREATE POLICY "Public read access - regulations" ON regulations FOR SELECT USING (true);
CREATE POLICY "Public read access - committees" ON committees FOR SELECT USING (true);
CREATE POLICY "Public read access - special_past_presidents" ON special_past_presidents FOR SELECT USING (true);

-- Admin full access (authenticated users only)
CREATE POLICY "Admin full access - years" ON years FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - members" ON members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - executive_positions" ON executive_positions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - schedules" ON schedules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - past_presidents" ON past_presidents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - regulations" ON regulations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - committees" ON committees FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access - special_past_presidents" ON special_past_presidents FOR ALL USING (auth.role() = 'authenticated');
