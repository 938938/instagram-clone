import LogoutBtn from '@/components/auth/LogoutBtn';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export const metadata = {
  title: 'Inflearngram',
  description: 'Instagram clone project',
};

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className='w-full'>
      <h1>Welcome {session?.user?.email?.split('@')?.[0]}</h1>
      <LogoutBtn />
    </main>
  );
}
