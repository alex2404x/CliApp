import Link from 'next/link';
import { MiningReferences } from '@/components/MiningReferences';
import { hashrate, inventory, plans } from '@/lib/seed';

export default function PlansPage() {
  return <section className="mx-auto max-w-3xl space-y-6">
    <header className="space-y-2"><p className="text-sm text-accent">Capacidad declarada: {inventory.declaredTH} TH/s</p><h1 className="text-3xl font-bold">Catálogo de contratos</h1><p className="text-text-muted">Compara las potencias por contrato. Las tarifas todavía no están publicadas y no se aceptan pagos.</p></header>
    <div className="grid gap-4 sm:grid-cols-2">{plans.map(plan => <article key={plan.id} className="space-y-3 rounded-lg border border-border bg-surface p-5"><p className="text-xs font-semibold uppercase tracking-wide text-accent">{plan.monthly ? 'Suscripción mensual' : 'Contrato de potencia'}</p><h2 className="text-2xl font-semibold">{hashrate(plan.gh)}</h2><Link className="text-sm text-accent underline" href={`/cloud-mining/plan/${plan.id}`} aria-label={`Ver ${plan.monthly ? 'suscripción mensual' : 'contrato'} de ${hashrate(plan.gh)}`}>Consultar condiciones</Link></article>)}</div>
    <MiningReferences />
  </section>;
}
