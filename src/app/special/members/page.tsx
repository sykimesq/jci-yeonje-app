import { createClient } from '@/lib/supabase/server'
import SpecialMembersClient from './SpecialMembersClient'

export const dynamic = 'force-dynamic'

export default async function SpecialMembersPage() {
  const supabase = await createClient()

  const { data: members } = await (supabase as any)
    .from('members')
    .select('*')
    .in('member_type', ['special', 'honorary', 'junior'])
    .order('order_index', { ascending: true })

  return <SpecialMembersClient members={members || []} />
}
