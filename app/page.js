'use client';

import { useEffect, useState } from 'react';
import DashboardCards from '@/app/components/DashboardCards';
import ProductForm from '@/app/components/ProductForm';
import ProductTable from '@/app/components/ProductTable';
import HistoryPanel from '@/app/components/HistoryPanel';
import { STATUSES } from '@/lib/status';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');

  async function loadProducts() {
    const query = new URLSearchParams({ search, status });
    const response = await fetch(`/api/products?${query.toString()}`);
    const data = await response.json();
    setProducts(data);
  }

  async function loadProductHistory(productId) {
    const response = await fetch(`/api/products/${productId}/history`);
    const product = await response.json();
    setSelectedProduct(product);
  }

  useEffect(() => {
    loadProducts();
  }, [search, status]);

  async function handleProductCreated() {
    await loadProducts();
  }

  async function handleSelectProduct(productId) {
    await loadProductHistory(productId);
  }

  async function refreshSelectedHistory(productId) {
    await loadProducts();
    await loadProductHistory(productId);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 md:p-8">
      <header>
        <h1 className="text-3xl font-bold">Amazon FBA Product Research Tracker</h1>
        <p className="text-slate-600">
          Beginner-friendly sample tracker inspired by Keepa-style workflows (without Keepa API and without scraping).
        </p>
      </header>

      <DashboardCards products={products} />

      <ProductForm onProductCreated={handleProductCreated} />

      <section className="grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-3">
        <input
          className="rounded-lg border p-2 md:col-span-2"
          placeholder="Search by title, ASIN, or category"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className="rounded-lg border p-2" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="ALL">All statuses</option>
          {STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </section>

      <ProductTable products={products} onSelectProduct={handleSelectProduct} />

      <HistoryPanel selectedProduct={selectedProduct} onRefresh={refreshSelectedHistory} />
    </main>
  );
}
