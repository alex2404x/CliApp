import Link from 'next/link';

export default function OrdersPage() {
  return <section className="mx-auto max-w-2xl space-y-5"><h1 className="text-3xl font-bold">Contratos y producción</h1><div className="space-y-3 rounded-xl border border-border bg-surface p-6"><h2 className="text-xl font-bold">Sin registros de producción vinculados</h2><p className="text-text-muted">No hay un registro de órdenes ni de liquidaciones conectado a este panel. No se muestran saldos estimados como ganancias reales.</p><Link href="/cloud-mining/plans" className="inline-block text-accent underline">Consultar catálogo</Link></div></section>;
}
