import { createClient } from '@/lib/supabase/server'
import PastPresidentsClient from './PastPresidentsClient'

export const dynamic = 'force-dynamic'

export default async function PastPresidentsPage() {
  const supabase = await createClient()
  const { data: presidents } = await (supabase as any)
    .from('past_presidents')
    .select('*')
    .order('order_index', { ascending: true })

  return <PastPresidentsClient presidents={presidents || []} />
}
