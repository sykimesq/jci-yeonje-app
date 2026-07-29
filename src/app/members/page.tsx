import { createClient } from '@/lib/supabase/server'
import MembersClient from './MembersClient'

export const dynamic = 'force-dynamic'

export default async function MembersPage() {
  const supabase = await createClient()
  const { data: years } = await (supabase as any)
    .from('years')
    .select('id, year, is_current')
    .order('year', { ascending: false })
    .limit(1)

  const yearId = years?.[0]?.id || ''

  const { data: members } = await (supabase as any)
    .from('members')
    .select('*')
    .eq('year_id', yearId)
    .eq('member_type', 'regular')
    .order('order_index', { ascending: true })

  return <MembersClient members={members || []} yearId={yearId} />
}
