import { Button } from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 space-y-6 bg-surface rounded-xl p-8 border border-border">
        <h1 className="text-4xl font-extrabold text-text">Simple & Transparent Cloud Hashrate</h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Start mining cryptocurrency in three simple steps with industrial-grade ASIC hash rate.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/cloud-mining/plans">
            <Button size="lg">Explore Plans</Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-surface rounded-lg border border-border">
          <h3 className="font-semibold text-lg text-accent mb-2">1. Select Plan</h3>
          <p className="text-sm text-text-muted">Choose your preferred miner model, duration, and target hashrate capacity.</p>
        </div>
        <div className="p-6 bg-surface rounded-lg border border-border">
          <h3 className="font-semibold text-lg text-accent mb-2">2. Pay Fees</h3>
          <p className="text-sm text-text-muted">Pay initial hashrate fee along with upfront or daily electricity operational costs.</p>
        </div>
        <div className="p-6 bg-surface rounded-lg border border-border">
          <h3 className="font-semibold text-lg text-accent mb-2">3. Receive Output</h3>
          <p className="text-sm text-text-muted">Daily cryptocurrency rewards are automatically settled directly into your account ledger.</p>
        </div>
      </section>
    </div>
  );
}
