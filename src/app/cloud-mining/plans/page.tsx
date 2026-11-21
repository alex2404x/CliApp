import { Button } from "@/components/Button";
import { plans } from "@/lib/seed";
import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cloud Mining Contracts</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="p-6 bg-surface border border-border rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{plan.name}</h2>
                <p className="text-xs text-text-muted">Model: {plan.miner_model}</p>
              </div>
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded font-semibold">
                {plan.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-bg p-4 rounded-lg border border-border">
              <div>
                <span className="text-text-muted text-xs block">Hashrate</span>
                <span className="font-semibold">{plan.hashrate_th} TH/s</span>
              </div>
              <div>
                <span className="text-text-muted text-xs block">Duration</span>
                <span className="font-semibold">{plan.duration_days} Days</span>
              </div>
              <div>
                <span className="text-text-muted text-xs block">Hashrate Fee</span>
                <span className="font-semibold">${plan.hashrate_price_usd}</span>
              </div>
              <div>
                <span className="text-text-muted text-xs block">Electricity / Day</span>
                <span className="font-semibold">${plan.daily_electricity_fee_usd}</span>
              </div>
            </div>

            <Link href={`/cloud-mining/plan/${plan.id}`} className="block">
              <Button className="w-full">Select & Configure</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
