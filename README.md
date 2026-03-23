# Amazon FBA Product Research App (Beginner-Friendly)

A lightweight, beginner-friendly **Amazon FBA product research tracker** inspired by Keepa-style workflows, built with:

- **Next.js + React**
- **Tailwind CSS**
- **Prisma**
- **SQLite**

> Important: this app does **not** use Keepa API and does **not** scrape Amazon. It starts with sample data.

---

## Features

- Add product manually by **ASIN**
- Save product fields: title, ASIN, category, notes, supplier cost, selling price
- Save **daily snapshots**
- View **product history**
- Calculate **profit**, **margin**, and **ROI**
- Status labels: **Watchlist**, **Good**, **Risky**
- Dashboard with summary cards, search, and filters

---

## 1) Prerequisites

- Node.js 20+
- npm 10+

---

## 2) Install dependencies

```bash
npm install
```

---

## 3) Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

It should contain:

```env
DATABASE_URL="file:./dev.db"
```

---

## 4) Generate Prisma client + create database schema

```bash
npm run prisma:generate
npx prisma migrate dev --name init
```

---

## 5) Seed sample data

```bash
npm run prisma:seed
```

This inserts sample products and sample daily snapshots so you can explore the dashboard immediately.

---

## 6) Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```text
app/
  api/
    products/
      route.js
      [id]/history/route.js
      [id]/snapshots/route.js
  components/
    DashboardCards.js
    HistoryPanel.js
    ProductForm.js
    ProductTable.js
  layout.js
  page.js
lib/
  metrics.js
  prisma.js
  status.js
prisma/
  schema.prisma
  seed.js
```

---

## Notes for beginners

- Keep code simple first, then improve gradually.
- You can manually add a daily snapshot by selecting a product row and submitting the history form.
- Metrics are calculated in `lib/metrics.js` and reused across the app.

