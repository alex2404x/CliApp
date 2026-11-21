export function POST() {
  return Response.json({ error: 'Liquidaciones deshabilitadas: no hay registros de producción vinculados.' }, {status: 503});
}
