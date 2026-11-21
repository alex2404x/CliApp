import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 1. Fetch all active orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, plans(*)')
    .eq('status', 'active');

  if (!orders) return NextResponse.json({ processed: 0 });

  // 2. Distribute rewards
  const payoutDate = new Date().toISOString().split('T')[0];

  for (const order of orders) {
    const minedBtc = 0.00005 * order.quantity; // Simplified reward logic
    const elecFee = order.plans.daily_electricity_fee_usd * order.quantity;

    await supabase.from('daily_payouts').insert({
      order_id: order.id,
      user_id: order.user_id,
      payout_date: payoutDate,
      mined_btc: minedBtc,
      electricity_deducted_usd: elecFee,
      net_profit_usd: (minedBtc * 60000) - elecFee, // Mock price $60k
    }).catch(() => {
      // Idempotency: skip if already paid for this date
      console.log(`Order ${order.id} already processed for ${payoutDate}`);
    });
  }

  return NextResponse.json({ processed: orders.length });
}
