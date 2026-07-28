import { createClient } from '@/lib/supabase/server'
import ExecutivesClient from './ExecutivesClient'

export const dynamic = 'force-dynamic'

export default async function ExecutivesPage() {
  const supabase = await createClient()
  const { data: years } = await (supabase as any)
    .from('years')
    .select('id, year, is_current')
    .order('year', { ascending: false })
    .limit(1)

  const yearId = years?.[0]?.id || ''

  const { data: positions } = await (supabase as any)
    .from('executive_positions')
    .select('*')
    .eq('year_id', yearId)
    .order('order_index', { ascending: true })

  const { data: committees } = await (supabase as any)
    .from('committees')
    .select('*')
    .eq('year_id', yearId)
    .order('order_index', { ascending: true })

  return <ExecutivesClient positions={positions || []} committees={committees || []} />
}
