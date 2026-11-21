export default function UserOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Mining Contracts & Payouts</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
          <span className="text-xs text-text-muted">Active Hashrate</span>
          <p className="text-2xl font-bold text-accent">110 TH/s</p>
        </div>
        <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
          <span className="text-xs text-text-muted">Total Mined Earnings</span>
          <p className="text-2xl font-bold text-success">0.01420500 BTC</p>
        </div>
        <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
          <span className="text-xs text-text-muted">Active Orders</span>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border font-semibold">Order History</div>
        <table className="w-full text-left text-sm">
          <thead className="bg-bg text-text-muted border-b border-border">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Hashrate</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-6 py-4 font-mono text-xs">ord_9843a1f</td>
              <td className="px-6 py-4">Antminer S19Pro Plan</td>
              <td className="px-6 py-4">110 TH/s</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-success/20 text-success text-xs rounded">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
