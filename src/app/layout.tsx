import Link from 'next/link';
import '../../design/tokens.css';
import './globals.css';

export const metadata = { title: 'CloudMine Platform', description: 'Explore cloud mining plans and review your contracts.' };
export const viewport = { themeColor: '#0f172a' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body className="flex min-h-screen flex-col">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface px-6 py-4">
      <Link href="/cloud-mining" className="text-xl font-bold text-accent">CloudMine Platform</Link>
      <nav aria-label="Main navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {Object.entries({'/cloud-mining':'Inicio','/cloud-mining/plans':'Catálogo','/user/orders':'Producción','/privacy':'Privacidad','/terms':'Términos'}).map(([href,label])=><Link className="hover:text-accent" href={href} key={href}>{label}</Link>)}
      </nav>
    </header>
    <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">{children}</main>
    <footer className="border-t border-border bg-surface px-6 py-4 text-center text-xs text-text-muted">&copy; {new Date().getFullYear()} Hashnest. All rights reserved.</footer>
  </body></html>;
}
