import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

export async function POST(req: NextRequest) {
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-08-27.basil',
  })

  try {
    const body = await req.json()
    const {
      items,
      customer,
      currency = 'inr',
      metadata = {},
    } = body || {}

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const line_items = items.map((it: any) => ({
      price_data: {
        currency,
        product_data: {
          name: it.name,
        },
        unit_amount: Math.round((it.unitAmount ?? it.price) * 100),
      },
      quantity: it.quantity ?? 1,
    }))

    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?success=1`
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?canceled=1`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customer?.email,
      metadata,
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Checkout error' }, { status: 500 })
  }
}



