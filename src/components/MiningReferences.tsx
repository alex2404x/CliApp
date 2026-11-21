const offers = [
  { capacity: 10, days: 30, rate: 0.0033 },
  { capacity: 50, days: 180, rate: 0.0029 },
];
const tariff = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 4 });

export function MiningReferences() {
  return <section id="referencias" aria-labelledby="market-title" className="space-y-5 border-t border-border pt-8">
    <header className="space-y-2"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Cuaderno de mercado / 01</p><h2 id="market-title" className="text-2xl font-bold">Qué cuesta alquilar potencia</h2><p className="text-sm text-text-muted">Dos referencias públicas de Bitdeer para el Antminer S19 Pro. Son tarifas de un tercero, no el precio de nuestros contratos.</p></header>
    <div className="grid gap-4 sm:grid-cols-2">{offers.map(offer => <article key={offer.days} className="rounded-lg border border-border bg-surface p-5"><p className="text-xs font-semibold text-accent">Agotado en origen</p><h3 className="mt-2 text-xl font-semibold">{offer.capacity} TH/s · {offer.days} días</h3><dl className="mt-4 space-y-2 text-sm">{[['Alquiler de potencia', tariff.format(offer.rate)], ['Electricidad', '0,0531']].map(([name,value]) => <div key={name} className="flex flex-wrap justify-between gap-2"><dt className="text-text-muted">{name}</dt><dd className="font-mono">{value} USD</dd></div>)}</dl><p className="mt-3 border-t border-border pt-3 text-xs text-text-muted">Importes por TH/s contratado y día.</p></article>)}</div>
    <p className="text-sm text-text-muted"><a className="text-accent underline" href="https://www.bitdeer.com/cloud-mining">Fuente: catálogo de Bitdeer</a> · Consulta del 21/11/2026. Las tarifas pueden cambiar.</p>
    <aside className="space-y-2 border-l-2 border-accent pl-4"><h3 className="font-semibold">Archivo de la red · Bloque 840.000</h3><p className="text-sm text-text-muted">Este bloque de Bitcoin registró 3.050 transacciones el 20 de abril de 2024 (UTC). Es actividad de toda la red, no producción atribuible a este operador.</p><a className="text-sm text-accent underline" href="https://blockstream.info/block/0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5">Ver bloque en Blockstream</a></aside>
  </section>;
}
