export const STATUSES = [
  { value: 'WATCHLIST', label: 'Watchlist' },
  { value: 'GOOD', label: 'Good' },
  { value: 'RISKY', label: 'Risky' }
];

export function getStatusLabel(status) {
  const found = STATUSES.find((item) => item.value === status);
  return found ? found.label : status;
}

export function getStatusBadgeClass(status) {
  if (status === 'GOOD') return 'bg-emerald-100 text-emerald-700';
  if (status === 'RISKY') return 'bg-red-100 text-red-700';
  return 'bg-amber-100 text-amber-700';
}
