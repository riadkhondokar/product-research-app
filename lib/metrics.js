export function calculateMetrics({ supplierCost, sellingPrice }) {
  const profit = Number(sellingPrice) - Number(supplierCost);
  const margin = Number(sellingPrice) > 0 ? (profit / Number(sellingPrice)) * 100 : 0;
  const roi = Number(supplierCost) > 0 ? (profit / Number(supplierCost)) * 100 : 0;

  return {
    profit,
    margin,
    roi
  };
}

export function toCurrency(value) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

export function toPercent(value) {
  return `${Number(value).toFixed(1)}%`;
}
