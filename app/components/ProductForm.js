'use client';

import { useState } from 'react';
import { STATUSES } from '@/lib/status';

const initialForm = {
  title: '',
  asin: '',
  category: '',
  notes: '',
  supplierCost: '',
  sellingPrice: '',
  status: 'WATCHLIST'
};

export default function ProductForm({ onProductCreated }) {
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  function updateField(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setForm(initialForm);
      onProductCreated();
    }

    setIsSaving(false);
  }

  return (
    <form className="grid gap-3 rounded-xl bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold">Add Product (Manual ASIN)</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          required
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          className="rounded-lg border p-2"
          placeholder="Product title"
        />
        <input
          required
          value={form.asin}
          onChange={(event) => updateField('asin', event.target.value.toUpperCase())}
          className="rounded-lg border p-2"
          placeholder="ASIN"
        />
        <input
          required
          value={form.category}
          onChange={(event) => updateField('category', event.target.value)}
          className="rounded-lg border p-2"
          placeholder="Category"
        />
        <select
          value={form.status}
          onChange={(event) => updateField('status', event.target.value)}
          className="rounded-lg border p-2"
        >
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <input
          required
          type="number"
          step="0.01"
          value={form.supplierCost}
          onChange={(event) => updateField('supplierCost', event.target.value)}
          className="rounded-lg border p-2"
          placeholder="Supplier cost (USD)"
        />
        <input
          required
          type="number"
          step="0.01"
          value={form.sellingPrice}
          onChange={(event) => updateField('sellingPrice', event.target.value)}
          className="rounded-lg border p-2"
          placeholder="Selling price (USD)"
        />
      </div>
      <textarea
        value={form.notes}
        onChange={(event) => updateField('notes', event.target.value)}
        className="min-h-20 rounded-lg border p-2"
        placeholder="Notes (optional)"
      />
      <button className="rounded-lg bg-slate-900 px-4 py-2 text-white" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
}
