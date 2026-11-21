import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <header className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between">
        <Link href="/cloud-mining" className="text-xl font-bold text-accent">
          CloudMine Platform
        </Link>
        <nav className="flex space-x-6 text-sm">
          <Link href="/cloud-mining" className="hover:text-accent">Home</Link>
          <Link href="/cloud-mining/plans" className="hover:text-accent">Mining Plans</Link>
          <Link href="/user/orders" className="hover:text-accent">Dashboard</Link>
        </nav>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
      <footer className="border-t border-border bg-surface px-6 py-4 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} CloudMine Platform. All rights reserved.
      </footer>
    </div>
  );
}
