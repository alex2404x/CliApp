export function POST() {
  return Response.json({ error: 'Contratación deshabilitada. No se han registrado pedidos.' }, {status: 503});
}
