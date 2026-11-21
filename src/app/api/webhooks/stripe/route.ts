import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, planId, quantity } = session.metadata!;

    // Create order in Supabase
    await supabase.from('orders').insert({
      user_id: userId,
      plan_id: planId,
      quantity: parseInt(quantity),
      status: 'active',
      starts_at: new Date().toISOString(),
      ends_at: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000).toISOString(), // Mock 360 days
    });
  }

  return NextResponse.json({ received: true });
}
