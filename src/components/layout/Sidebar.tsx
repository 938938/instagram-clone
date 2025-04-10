'use client';

import Link from 'next/link';
// import { Home, Logout, People, Search, Send } from '@mui/icons-material';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';

const Sidebar = () => {
  const supabase = createBrowserSupabaseClient();

  return (
    <aside className='w-fit h-screen p-6 border-r border border-gray-300 flex flex-col justify-between'>
      <div className='flex flex-col gap-4'>
        <Link href='/'>{/* <Home className='text-2xl mb-10' /> */}홈</Link>
        <Link href='/people'>
          {/* <People className='text-2xl' /> */}사람들
        </Link>
        <Link href='/discover'>
          {/* <Search className='text-2xl' /> */}발견
        </Link>
        <Link href='/chat'>{/* <Send className='text-2xl' /> */}채팅</Link>
      </div>
      <div>
        <button
          onClick={async () => {
            (await supabase).auth.signOut();
          }}
        >
          {/* <Logout className='text-2xl text-deep-purple-900' /> */}로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
