# Stripe Integration Plan for DARA & DIDI

## Overview
Add payment processing to monetize DARA/DIDI research platform. Collect payment BEFORE running OpenAI API calls to ensure cash-flow positive operations.

---

## Phase 1: Stripe Setup (30 minutes)

### 1. Create Stripe Account
- Go to https://stripe.com
- Sign up for account
- Complete business verification
- Get API keys from Dashboard → Developers → API keys

### 2. Install Stripe SDK
```bash
cd DD10-DARA
pnpm add stripe @stripe/stripe-js
```

### 3. Add Environment Variables
```env
# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## Phase 2: Create Products & Prices (15 minutes)

### In Stripe Dashboard → Products

**Product 1: Single DARA Report**
- Name: "DARA Audience Research Report"
- Price: $29 one-time
- Description: "Complete 5-module synthetic audience research"

**Product 2: Monthly Subscription**
- Name: "DARA Pro Monthly"
- Price: $99/month recurring
- Description: "10 DARA reports per month + priority support"

**Product 3: Enterprise**
- Name: "DARA Enterprise"
- Price: $299/month recurring
- Description: "Unlimited reports + DIDI enhancements + API access"

**Product 4: DIDI Enhancement (Add-on)**
- Name: "DIDI Deep Enhancement"
- Price: $19 one-time
- Description: "6-module enhancement for existing DARA report"

---

## Phase 3: Implementation (2-3 hours)

### File Structure
```
app/
├── api/
│   ├── checkout/
│   │   └── route.ts          # Create Checkout Session
│   ├── webhooks/
│   │   └── stripe/
│   │       └── route.ts      # Handle Stripe events
│   ├── research/
│   │   └── route.ts          # Modified to check payment
│   └── enhance/
│       └── route.ts          # Modified to check payment
components/
├── pricing-modal.tsx         # Pricing tiers display
└── payment-gate.tsx          # Payment required screen
lib/
└── stripe.ts                 # Stripe client & utilities
```

### 1. Create Stripe Utilities (`lib/stripe.ts`)
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const PRODUCTS = {
  SINGLE_REPORT: 'price_xxx', // Replace with actual Price ID
  MONTHLY: 'price_xxx',
  ENTERPRISE: 'price_xxx',
  DIDI_ENHANCEMENT: 'price_xxx',
};
```

### 2. Create Checkout API (`app/api/checkout/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const { priceId, mode } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: mode || 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/research/new?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: {
      product_type: 'dara_report',
    },
  });

  return NextResponse.json({ url: session.url });
}
```

### 3. Create Webhook Handler (`app/api/webhooks/stripe/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Grant access to research
      // Store in database: user_id, credits, expiry
      break;

    case 'customer.subscription.deleted':
      // Revoke access
      break;
  }

  return NextResponse.json({ received: true });
}
```

### 4. Modify Research API (`app/api/research/route.ts`)
```typescript
// Add at the top of POST handler
export async function POST(request: NextRequest) {
  const { sessionId } = await request.json();

  // Verify payment
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Payment required' },
      { status: 402 }
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  
  if (session.payment_status !== 'paid') {
    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 402 }
    );
  }

  // Continue with research...
}
```

### 5. Create Pricing Modal (`components/pricing-modal.tsx`)
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function PricingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId: string, mode: string) => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, mode }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Single Report */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold">Single Report</h3>
            <p className="text-3xl font-bold mt-4">$29</p>
            <p className="text-muted-foreground">One-time</p>
            <Button
              className="w-full mt-6"
              onClick={() => handleCheckout('price_xxx', 'payment')}
              disabled={loading}
            >
              Purchase
            </Button>
          </div>

          {/* Monthly */}
          <div className="border-2 border-primary rounded-lg p-6">
            <h3 className="text-xl font-bold">Pro Monthly</h3>
            <p className="text-3xl font-bold mt-4">$99</p>
            <p className="text-muted-foreground">per month</p>
            <Button
              className="w-full mt-6"
              onClick={() => handleCheckout('price_xxx', 'subscription')}
              disabled={loading}
            >
              Subscribe
            </Button>
          </div>

          {/* Enterprise */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold">Enterprise</h3>
            <p className="text-3xl font-bold mt-4">$299</p>
            <p className="text-muted-foreground">per month</p>
            <Button
              className="w-full mt-6"
              onClick={() => handleCheckout('price_xxx', 'subscription')}
              disabled={loading}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Phase 4: Testing (1 hour)

### Stripe Test Mode
1. Use test API keys (start with `sk_test_` and `pk_test_`)
2. Test credit card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC

### Test Flow
1. Click "New Research"
2. Pricing modal appears
3. Select "Single Report"
4. Redirected to Stripe Checkout
5. Enter test card
6. Complete payment
7. Redirected back with `session_id`
8. Research runs successfully
9. Results displayed

### Webhook Testing
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Phase 5: Production Launch (30 minutes)

### 1. Switch to Live Mode
- Get live API keys from Stripe Dashboard
- Update environment variables in Vercel
- Test with real card (small amount)

### 2. Set Up Webhook Endpoint
- In Stripe Dashboard → Developers → Webhooks
- Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
- Select events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`

### 3. Update Environment Variables
```env
# Vercel Production
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://your-domain.vercel.app
```

---

## Pricing Strategy

### Cost Analysis
**OpenAI API (gpt-4o-mini):**
- DARA (5 modules): ~$0.50 - $2.00
- DIDI (6 modules): ~$0.75 - $2.50
- Total for enhanced report: ~$1.25 - $4.50

**Margins:**
- Single Report ($29): ~$25-28 profit (86-96% margin)
- Monthly ($99): ~$10-20 cost, $79-89 profit (80-90% margin)
- Enterprise ($299): ~$50-150 cost, $149-249 profit (50-83% margin)

### Pricing Tiers
```
┌─────────────────┬──────────┬────────────────────────────────┐
│ Tier            │ Price    │ Includes                       │
├─────────────────┼──────────┼────────────────────────────────┤
│ Single Report   │ $29      │ 1 DARA report                  │
│ Pro Monthly     │ $99/mo   │ 10 DARA reports                │
│ Enterprise      │ $299/mo  │ Unlimited + DIDI + API access  │
│ DIDI Add-on     │ $19      │ Enhance existing DARA report   │
└─────────────────┴──────────┴────────────────────────────────┘
```

---

## Revenue Projections

### Conservative (Month 1)
- 10 single reports: $290
- 2 monthly subs: $198
- **Total: $488**
- Costs: ~$50 (OpenAI)
- **Profit: $438**

### Moderate (Month 3)
- 50 single reports: $1,450
- 15 monthly subs: $1,485
- 3 enterprise: $897
- **Total: $3,832**
- Costs: ~$300 (OpenAI)
- **Profit: $3,532**

### Aggressive (Month 6)
- 200 single reports: $5,800
- 50 monthly subs: $4,950
- 10 enterprise: $2,990
- **Total: $13,740**
- Costs: ~$1,200 (OpenAI + infrastructure)
- **Profit: $12,540**

---

## Next Steps After Stripe Integration

1. **Add Usage Tracking**
   - Track credits/reports per user
   - Implement rate limiting
   - Show usage dashboard

2. **Migrate to Database**
   - Supabase for user accounts
   - Store payment history
   - Track research artifacts

3. **Add Authentication**
   - Clerk or Supabase Auth
   - Link Stripe customers to users
   - Protect API routes

4. **Marketing & Growth**
   - Launch on Product Hunt
   - Content marketing (blog posts)
   - SEO optimization
   - Social media presence

---

## Security Checklist

- [ ] Never expose Stripe secret key in frontend
- [ ] Verify webhook signatures
- [ ] Use HTTPS in production
- [ ] Validate payment status before granting access
- [ ] Store customer IDs securely
- [ ] Implement rate limiting
- [ ] Log all transactions
- [ ] Handle failed payments gracefully

---

## Support Resources

- **Stripe Docs:** https://stripe.com/docs
- **Next.js + Stripe:** https://vercel.com/guides/getting-started-with-nextjs-and-stripe
- **Webhook Testing:** https://stripe.com/docs/webhooks/test

---

**Ready to monetize. Let's get paid.** 💰
