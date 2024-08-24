"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/ui/CheckoutPage";

export default function PaymentPage() {
  const [amount, setAmount] = useState<number>(); //sate to manage the amount input value
  const [stripeAmount, setStripeAmount] = useState<number>() //state to manage the stripe amount
  const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);

  const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    : Promise.reject(new Error("Stripe public key is not defined"));

  const handleAmountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStripeAmount(amount)

    console.log("Creating payment intent for price:", stripeAmount);
    setPaymentIntentCreated(true);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 p-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAmountSubmit} className="space-y-4">
              <Input
                type="number"
                placeholder="Enter price"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                min={0}
              />
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 p-8">
        {paymentIntentCreated && stripeAmount ? (
          <Card>
          <CardHeader>
            <CardTitle>Stripe Payment for ${stripeAmount}</CardTitle>
          </CardHeader>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubCurrency(stripeAmount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={stripeAmount} />
          </Elements>
        </Card>
          
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Stripe Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {/* Placeholder for Stripe component */}
                <p>Please enter an amount to create a payment intent.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
