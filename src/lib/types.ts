export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      years: {
        Row: Year
        Insert: Omit<Year, 'id' | 'created_at'>
        Update: Partial<Omit<Year, 'id'>>
      }
      members: {
        Row: Member
        Insert: Omit<Member, 'id' | 'created_at'>
        Update: Partial<Omit<Member, 'id'>>
      }
      executive_positions: {
        Row: ExecutivePosition
        Insert: Omit<ExecutivePosition, 'id' | 'created_at'>
        Update: Partial<Omit<ExecutivePosition, 'id'>>
      }
      schedules: {
        Row: Schedule
        Insert: Omit<Schedule, 'id' | 'created_at'>
        Update: Partial<Omit<Schedule, 'id'>>
      }
      past_presidents: {
        Row: PastPresident
        Insert: Omit<PastPresident, 'id' | 'created_at'>
        Update: Partial<Omit<PastPresident, 'id'>>
      }
      regulations: {
        Row: Regulation
        Insert: Omit<Regulation, 'id' | 'created_at'>
        Update: Partial<Omit<Regulation, 'id'>>
      }
      committees: {
        Row: Committee
        Insert: Omit<Committee, 'id' | 'created_at'>
        Update: Partial<Omit<Committee, 'id'>>
      }
      special_past_presidents: {
        Row: SpecialPastPresident
        Insert: Omit<SpecialPastPresident, 'id' | 'created_at'>
        Update: Partial<Omit<SpecialPastPresident, 'id'>>
      }
    }
  }
}

export interface Year {
  id: string
  year: number
  slogan: string
  is_current: boolean
  created_at: string
}

export interface Member {
  id: string
  year_id: string
  name: string
  name_hanja: string
  name_english: string
  birth_date: string
  phone: string
  address: string
  workplace: string
  position_in_company: string
  jc_roles: string[]
  jc_awards: string[]
  photo_url: string
  member_type: 'regular' | 'special' | 'honorary' | 'junior'
  order_index: number
  created_at: string
}

export interface ExecutivePosition {
  id: string
  year_id: string
  position_name: string
  member_name: string
  member_hanja: string
  member_english: string
  order_index: number
  created_at: string
}

export interface Schedule {
  id: string
  year_id: string
  month: number
  day: number
  title: string
  description: string
  is_important: boolean
  order_index: number
  created_at: string
}

export interface PastPresident {
  id: string
  generation: number
  name: string
  name_hanja: string
  term_years: string
  is_deceased: boolean
  order_index: number
  created_at: string
}

export interface Regulation {
  id: string
  year_id: string
  category: string
  title: string
  content: string
  order_index: number
  created_at: string
}

export interface Committee {
  id: string
  year_id: string
  name: string
  chairperson: string
  members: string[]
  order_index: number
  created_at: string
}

export interface SpecialPastPresident {
  id: string
  generation: string
  name: string
  name_hanja: string
  is_deceased: boolean
  order_index: number
  created_at: string
}

export const MEMBER_TYPE_LABELS: Record<string, string> = {
  regular: '정회원',
  special: '특우회원',
  honorary: '명예회원',
  junior: '준회원',
}

export const MEMBER_TYPE_COLORS: Record<string, string> = {
  regular: 'bg-blue-100 text-blue-800',
  special: 'bg-amber-100 text-amber-800',
  honorary: 'bg-purple-100 text-purple-800',
  junior: 'bg-gray-100 text-gray-800',
}
