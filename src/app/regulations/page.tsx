import { createClient } from '@/lib/supabase/server'
import RegulationsClient from './RegulationsClient'

export const dynamic = 'force-dynamic'

export default async function RegulationsPage() {
  const supabase = await createClient()
  const { data: years } = await (supabase as any)
    .from('years')
    .select('id, year, is_current')
    .order('year', { ascending: false })
    .limit(1)

  const yearId = years?.[0]?.id || ''

  const { data: regulations } = await (supabase as any)
    .from('regulations')
    .select('*')
    .eq('year_id', yearId)
    .order('order_index', { ascending: true })

  return <RegulationsClient regulations={regulations || []} />
}
