'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button } from '@material-tailwind/react';

const LogoutBtn = () => {
  const supabase = createBrowserSupabaseClient();

  return (
    <Button
      color='red'
      onClick={async () => {
        (await supabase).auth.signOut();
      }}
    >
      로그아웃
    </Button>
  );
};

export default LogoutBtn;
