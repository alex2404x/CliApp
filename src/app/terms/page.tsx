'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="prose max-w-2xl mx-auto p-6 bg-surface border border-border rounded-xl">
      <h1 className="text-2xl font-bold border-b border-border pb-4 mb-6">Términos y Condiciones</h1>

      <p>Última actualización: 20 de noviembre de 2026</p>

      <h2 className="text-xl font-medium margin-top-6">1. Aceptación de los Términos</h2>
      <p>Al acceder a Hashnest y utilizar nuestro servicio, aceptas estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no puedes acceder al servicio.</p>

      <h2 className="text-xl font-medium margin-top-6">2. Compra de Contratos de Mining</h2>
      <p>Al comprar un contrato de cloud mining en Hashnest, te comprometes a:</p>
      <ul>
        <li>Proporcionar información verdadera, exacta y actualizada durante el proceso de registro.</li>
        <li>Pagar el precio total del contrato seleccionado.</li>
        <li>Cumplir con todas las leyes y regulaciones aplicables en tu jurisdicción.</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">3. Cancelación y Reembolsos</h2>
      <p>Puedes cancelar tu contrato en cualquier momento mediante el panel de control. Las cancelaciones resultan en:</p>
      <ul>
        <li>El cese inmediato de las actividades de mining.</li>
        <li>No hay reembolsos parciales para periodos de contrato ya transcurridos.</li>
        <li>El saldo restante (si aplica) se transferirá a tu balance de Hashnest.</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">4. Responsabilidades</h2>
      <p>Nosotros nos comprometemos a:</p>
      <ul>
        <li>Proporcionar estimaciones precisas de recompensas basadas en parámetros de mining.</li>
        <li>Mantener la infraestructura necesaria para el funcionamiento del servicio.</li>
        <li>Proporcionar reportes transparentes sobre el estado de los contratos.</li>
      </ul>

      <p>Tú te comprometes a:</p>
      <ul>
        <li>No utilizar el servicio para actividades ilegales.</li>
        <li>Mantener tu información de cuenta segura y confidencial.</li>
        <li>Cumplir con todas las obligaciones fiscales relacionadas con tus ganancias.</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">5. Limitación de Responsabilidad</h2>
      <p>En la medida máxima permitida por la ley, Hashnest y sus proveedores no serán responsables por daños directos, indirectos, incidentales, especiales, consecuenciales o punitivos de cualquier tipo, ni por pérdidas de ganancias, datos u otras pérdidas intangibles, resultantes de:</p>
      <ul>
        <li>Uso o imposibilidad de usar el servicio.</li>
        <li>Cambios en las tarifas de mining o dificultad de la red.</li>
        <li>Fallos en la red o interrupciones del servicio.</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">6. Modificaciones</h2>
      <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos publicando los nuevos términos en esta página. Se recomienda consultar esta página periódicamente para estar al día de cualquier cambio.</p>

      <h2 className="text-xl font-medium margin-top-6">7. Ley Aplicable</h2>
      <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de tu jurisdicción, sin respecto a sus principios de conflicto de leyes.</p>

      <div className="mt-8 p-4 bg-bg rounded-lg border border-border">
        <p className="text-sm text-text-muted">
          Última actualización: 20 de noviembre de 2026. Hashnest se reserva el derecho de modificar estos términos en cualquier momento. Contáctanos en support@hashnest.com para consultas.
        </p>
      </div>
    </div>
  );
}