import { toCurrency, toPercent } from '@/lib/metrics';

export default function DashboardCards({ products }) {
  const summary = products.reduce(
    (acc, product) => {
      acc.total += 1;
      acc[product.status] += 1;
      acc.avgProfit += product.metrics.profit;
      acc.avgMargin += product.metrics.margin;
      acc.avgRoi += product.metrics.roi;
      return acc;
    },
    { total: 0, WATCHLIST: 0, GOOD: 0, RISKY: 0, avgProfit: 0, avgMargin: 0, avgRoi: 0 }
  );

  const count = summary.total || 1;

  const cards = [
    { label: 'Total Products', value: summary.total },
    { label: 'Watchlist', value: summary.WATCHLIST },
    { label: 'Good', value: summary.GOOD },
    { label: 'Risky', value: summary.RISKY },
    { label: 'Avg Profit', value: toCurrency(summary.avgProfit / count) },
    { label: 'Avg Margin', value: toPercent(summary.avgMargin / count) },
    { label: 'Avg ROI', value: toPercent(summary.avgRoi / count) }
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-7">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
          <p className="mt-1 text-xl font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
