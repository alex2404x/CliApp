'use client';

import { Button } from "@/components/Button";
import { plans } from "@/lib/seed";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlanDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const plan = plans.find((p) => p.id === params.id) || plans[0];
  const [quantity, setQuantity] = useState(1);

  const totalHashrate = plan.hashrate_th * quantity;
  const totalHashrateFee = plan.hashrate_price_usd * quantity;
  const totalDailyElec = plan.daily_electricity_fee_usd * quantity;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-surface p-6 border border-border rounded-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{plan.name}</h1>
          <p className="text-sm text-text-muted">Configure contract parameters and estimate returns.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">Quantity (Units)</label>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-bg border border-border-input rounded px-3 py-2 text-text"
          />
        </div>

        <div className="p-4 bg-bg border border-border rounded-lg space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Total Active Capacity:</span>
            <span className="font-semibold">{totalHashrate} TH/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Contract Duration:</span>
            <span className="font-semibold">{plan.duration_days} Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Upfront Hashrate Fee:</span>
            <span className="font-semibold">${totalHashrateFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Daily Electricity Fee:</span>
            <span className="font-semibold">${totalDailyElec} / day</span>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => router.push(`/checkout?planId=${plan.id}&qty=${quantity}`)}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
