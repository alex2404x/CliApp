import Link from 'next/link';
import { inventory } from '@/lib/seed';

export default function Home() {
  return <section className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border bg-surface">
    <div className="space-y-5 p-6 sm:p-10"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Minería de Bitcoin · Inventario propio</p><h1 className="text-4xl font-bold tracking-tight">Capacidad minera</h1><p className="max-w-xl text-text-muted">Consulta la potencia declarada por el operador y las condiciones pendientes antes de contratar.</p></div>
    <div className="border-y border-border bg-bg px-6 py-8 sm:px-10"><p className="text-sm text-text-muted">Potencia total declarada</p><p className="my-2 text-5xl font-semibold tabular-nums">{inventory.declaredTH} <span className="text-2xl text-accent">TH/s</span></p><p className="text-sm text-text-muted">Sin medición de pool vinculada</p></div>
    <div className="p-6 sm:px-10"><Link className="inline-block rounded-md bg-accent px-5 py-3 font-semibold text-on-accent" href="/cloud-mining/plans">Ver catálogo</Link></div>
  </section>;
}
