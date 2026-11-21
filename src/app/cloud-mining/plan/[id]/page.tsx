import { notFound, redirect } from 'next/navigation';
import { hashrate, inventory, plans } from '@/lib/seed';
import Link from 'next/link';

export default async function PlanDetails({ params }: { params: Promise<{id:string}> }) {
  const {id} = await params;
  if (id === inventory.id) redirect('/cloud-mining/plans');
  const plan = plans.find(item => item.id === id);
  if (!plan) notFound();
  const rows = [['Potencia por contrato',hashrate(plan.gh)],['Modalidad',plan.monthly ? 'Suscripción mensual' : 'Contrato sin suscripción'],['Plazo',plan.monthly ? 'Mensual' : 'Pendiente de publicación'],['Precio y moneda','Pendientes'],['Coste eléctrico','Pendiente'],['Producción medida','Sin datos del pool']];
  return <article className="mx-auto max-w-2xl space-y-6 rounded-xl border border-border bg-surface p-6"><Link href="/cloud-mining/plans" className="text-sm text-accent underline">Volver al catálogo</Link><h1 className="text-2xl font-bold">{plan.monthly ? 'Suscripción mensual' : 'Contrato'} de {hashrate(plan.gh)}</h1><dl className="divide-y divide-border">{rows.map(([label,value])=><div key={label} className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-text-muted">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl><p>Venta pendiente de activación. Consultar esta ficha no reserva potencia ni genera cargos.</p><Link href="/cloud-mining/plans#referencias" className="block text-accent underline">Comparar tarifas públicas del mercado</Link></article>;
}
