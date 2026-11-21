import { notFound } from 'next/navigation';
import { inventory } from '@/lib/seed';
import Link from 'next/link';

export default async function PlanDetails({ params }: { params: Promise<{id:string}> }) {
  if ((await params).id !== inventory.id) notFound();
  return <article className="mx-auto max-w-2xl space-y-6 rounded-xl border border-border bg-surface p-6"><Link href="/cloud-mining/plans" className="text-sm text-accent underline">Volver al catálogo</Link><h1 className="text-2xl font-bold">Ficha de capacidad propia</h1><dl className="divide-y divide-border">{[['Inventario declarado',`${inventory.declaredTH} TH/s`],['Potencia por contrato','Sin definir'],['Duración','Sin definir'],['Precio y moneda','Sin definir'],['Coste eléctrico','Sin definir'],['Producción medida','Sin datos del pool']].map(([label,value])=><div key={label} className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-text-muted">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl><p>No se aceptan reservas ni pagos. La potencia declarada no acredita producción de BTC.</p><Link href="/cloud-mining/plans#referencias" className="block text-accent underline">Comparar tarifas públicas del mercado</Link></article>;
}
