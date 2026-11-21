'use client';

import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export default function AuthCallbackPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Successfully signed in via magic link or email confirmation
        window.location.href = '/user/orders';
      }
    });
  }, []);

  return <div>Confirming your email...</div>;
}
