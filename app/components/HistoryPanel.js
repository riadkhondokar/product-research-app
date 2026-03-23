'use client';

import { useState } from 'react';
import { toCurrency } from '@/lib/metrics';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function HistoryPanel({ selectedProduct, onRefresh }) {
  const [snapshotPrice, setSnapshotPrice] = useState('');
  const [snapshotDate, setSnapshotDate] = useState('');
  const [snapshotNotes, setSnapshotNotes] = useState('');

  if (!selectedProduct) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold">Product History</h3>
        <p className="mt-2 text-sm text-slate-600">Select a product row to view history and add daily snapshots.</p>
      </div>
    );
  }

  async function saveSnapshot(event) {
    event.preventDefault();

    const response = await fetch(`/api/products/${selectedProduct.id}/snapshots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        snapshotDate,
        sellingPrice: snapshotPrice,
        notes: snapshotNotes
      })
    });

    if (response.ok) {
      setSnapshotDate('');
      setSnapshotPrice('');
      setSnapshotNotes('');
      onRefresh(selectedProduct.id);
    }
  }

  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold">Product History</h3>
        <p className="text-sm text-slate-600">
          {selectedProduct.title} ({selectedProduct.asin})
        </p>
      </div>

      <form className="grid gap-2 md:grid-cols-3" onSubmit={saveSnapshot}>
        <input
          required
          type="date"
          className="rounded-lg border p-2"
          value={snapshotDate}
          onChange={(event) => setSnapshotDate(event.target.value)}
        />
        <input
          required
          type="number"
          step="0.01"
          className="rounded-lg border p-2"
          placeholder="Snapshot price"
          value={snapshotPrice}
          onChange={(event) => setSnapshotPrice(event.target.value)}
        />
        <input
          className="rounded-lg border p-2"
          placeholder="Snapshot notes"
          value={snapshotNotes}
          onChange={(event) => setSnapshotNotes(event.target.value)}
        />
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-white md:col-span-3">Save Daily Snapshot</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {selectedProduct.snapshots.map((snapshot) => (
              <tr key={snapshot.id} className="border-t">
                <td className="py-2">{formatDate(snapshot.snapshotDate)}</td>
                <td className="py-2">{toCurrency(snapshot.sellingPrice)}</td>
                <td className="py-2 text-slate-600">{snapshot.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
