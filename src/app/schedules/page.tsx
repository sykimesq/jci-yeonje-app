import { createClient } from '@/lib/supabase/server'
import SchedulesClient from './SchedulesClient'

export const dynamic = 'force-dynamic'

export default async function SchedulesPage() {
  const supabase = await createClient()
  const { data: years } = await (supabase as any)
    .from('years')
    .select('id, year, is_current')
    .order('year', { ascending: false })
    .limit(1)

  const yearId = years?.[0]?.id || ''

  const { data: schedules } = await (supabase as any)
    .from('schedules')
    .select('*')
    .eq('year_id', yearId)
    .order('month', { ascending: true })
    .order('day', { ascending: true })

  return <SchedulesClient schedules={schedules || []} />
}
