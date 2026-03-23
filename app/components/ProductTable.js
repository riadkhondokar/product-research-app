import { getStatusBadgeClass, getStatusLabel } from '@/lib/status';
import { toCurrency, toPercent } from '@/lib/metrics';

export default function ProductTable({ products, onSelectProduct }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">ASIN</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Supplier Cost</th>
            <th className="p-3">Current Price</th>
            <th className="p-3">Profit</th>
            <th className="p-3">Margin</th>
            <th className="p-3">ROI</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="cursor-pointer border-t hover:bg-slate-50"
              onClick={() => onSelectProduct(product.id)}
            >
              <td className="p-3">
                <p className="font-medium">{product.title}</p>
                {product.notes && <p className="text-xs text-slate-500">{product.notes}</p>}
              </td>
              <td className="p-3 font-mono">{product.asin}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(product.status)}`}
                >
                  {getStatusLabel(product.status)}
                </span>
              </td>
              <td className="p-3">{toCurrency(product.supplierCost)}</td>
              <td className="p-3">{toCurrency(product.currentPrice)}</td>
              <td className="p-3">{toCurrency(product.metrics.profit)}</td>
              <td className="p-3">{toPercent(product.metrics.margin)}</td>
              <td className="p-3">{toPercent(product.metrics.roi)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
