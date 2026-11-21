import Link from 'next/link';

export default function CheckoutPage() {
  return <section className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6"><h1 className="text-2xl font-bold">Compra no disponible</h1><p>No hay contratos con condiciones de venta publicadas. No se ha creado ningún pedido ni se ha realizado ningún cargo.</p><Link className="inline-block text-accent underline" href="/cloud-mining/plans">Volver al catálogo</Link></section>;
}
