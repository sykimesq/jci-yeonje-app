import { createClient } from '@/lib/supabase/server'
import SpecialPastPresidentsClient from './SpecialPastPresidentsClient'

export const dynamic = 'force-dynamic'

export default async function SpecialPastPresidentsPage() {
  const supabase = await createClient()

  const { data: specialPresidents } = await (supabase as any)
    .from('special_past_presidents')
    .select('*')
    .order('order_index', { ascending: true })

  return <SpecialPastPresidentsClient presidents={specialPresidents || []} />
}
