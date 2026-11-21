import Link from 'next/link';
import { MiningReferences } from '@/components/MiningReferences';
import { inventory } from '@/lib/seed';

export default function PlansPage() {
  return <section className="mx-auto max-w-3xl space-y-5"><h1 className="text-3xl font-bold">Catálogo de contratos</h1><article className="space-y-4 rounded-xl border border-border bg-surface p-6"><p className="text-sm font-medium text-accent">En preparación · No disponible para compra</p><h2 className="text-xl font-bold">Capacidad propia de Bitcoin</h2><p>Potencia total declarada: {inventory.declaredTH} TH/s.</p><p className="text-text-muted">El operador aún no ha publicado la potencia por contrato, el plazo ni las tarifas.</p><Link className="inline-block text-accent underline" href={`/cloud-mining/plan/${inventory.id}`}>Consultar ficha</Link></article><MiningReferences /></section>;
}
