'use client';
import { getSupabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Callback() {
  const [failed, setFailed] = useState(false);
  useEffect(() => { let active = true; async function confirm() { try { const {data} = await getSupabase().auth.getSession(); if (active && data.session) window.location.replace('/user/orders'); else if (active) setFailed(true); } catch { if (active) setFailed(true); } } void confirm(); return () => {active = false;}; }, []);
  return failed ? <p>No se pudo confirmar la sesión. <Link className="text-accent underline" href="/auth/login">Iniciar sesión</Link></p> : <p role="status">Confirmando sesión…</p>;
}
