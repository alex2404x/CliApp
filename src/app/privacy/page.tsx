'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="prose max-w-2xl mx-auto p-6 bg-surface border border-border rounded-xl">
      <h1 className="text-2xl font-bold border-b border-border pb-4 mb-6">Política de Privacidad</h1>

      <p>Última actualización: 20 de noviembre de 2026</p>

      <h2 className="text-xl font-medium margin-top-6">Información que recopilamos</h2>
      <ul>
        <li>Dirección de correo electrónico (para autenticación y notificaciones).</li>
        <li>Direcciones de wallet de criptomonedas (para pagos y recompensas).</li>
        <li>Datos de transacción de Stripe (procesados de forma segura).</li>
        <li>Información del plan de mining contratado (hashrate, duración, fechas).</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">Cómo usamos la información</h2>
      <ul>
        <li>Para proporcionarte y mantener el servicio de cloud mining.</li>
        <li>Para procesar pagos y distribuir recompensas diarias.</li>
        <li>Para comunicarnos contigo sobre tu cuenta y contratos.</li>
        <li>Para mejorar la experiencia del usuario.</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">Divulgación a terceros</h2>
      <p>No vendemos tu información personal a terceros. Podemos compartir datos con:</p>
      <ul>
        <li>Stripe: para procesamiento de pagos y gestión de suscripciones.</li>
        <li>Supabase: para almacenamiento de base de datos y autenticación.</li>
        <li>Resend: para envío de correos transaccionales.</li>
      </ul>

      <h2 className="text-xl font-medium margin-top-6">Seguridad</h2>
      <p>Implementamos medidas de seguridad adecuadas para proteger tu información personal. Los datos de pago se procesan mediante Stripe, que cumple con los estándares PCI-DSS.</p>

      <h2 className="text-xl font-medium margin-top-6">Tus derechos</h2>
      <p>Puedes solicitar el acceso, corrección o eliminación de tus datos personales en cualquier momento contactando a support@hashnest.com.</p>

      <div className="mt-8 p-4 bg-bg rounded-lg border border-border">
        <p className="text-sm text-text-muted">
          Si tienes preguntas sobre esta política, contáctanos en <a href="mailto:support@hashnest.com">support@hashnest.com</a>.
        </p>
      </div>
    </div>
  );
}