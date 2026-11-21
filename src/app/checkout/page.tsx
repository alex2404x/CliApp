'use client';

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState('USDT');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/user/orders?success=true');
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Order Summary & Payment</h1>

      <div className="bg-surface p-6 border border-border rounded-xl space-y-6">
        <div className="space-y-2 border-b border-border pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Selected Plan:</span>
            <span className="font-semibold">Antminer S19Pro Plan</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Total Order Cost:</span>
            <span className="font-semibold text-accent">$500.00 USD</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Select Payment Currency</label>
          <div className="grid grid-cols-3 gap-3">
            {['USDT', 'BTC', 'USD'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`py-2 border rounded text-sm font-medium transition-colors ${
                  currency === c
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-bg text-text-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" isLoading={isProcessing} onClick={handlePayment}>
          Confirm & Submit Payment
        </Button>
      </div>
    </div>
  );
}
