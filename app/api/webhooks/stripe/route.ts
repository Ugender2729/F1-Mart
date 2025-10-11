import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Route segment config for Next.js 13+
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function POST(req: NextRequest) {
  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Missing env configuration' }, { status: 500 })
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-08-27.basil' })

  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature') || ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Create server-side Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_details?.email || session.customer_email || null
      const amount_total = session.amount_total ? session.amount_total / 100 : null
      const payment_intent = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id

      if (email) {
        // Update latest order for this email to paid
        await supabase
          .from('orders')
          .update({
            status: 'paid',
            payment_method: 'stripe',
            payment_reference: payment_intent,
          })
          .eq('customer_email', email)
          .order('created_at', { ascending: false })
          .limit(1)
      }
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Processing error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}



