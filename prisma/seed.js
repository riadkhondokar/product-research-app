const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.dailySnapshot.deleteMany();
  await prisma.product.deleteMany();

  const productA = await prisma.product.create({
    data: {
      title: 'Silicone Kitchen Tongs (2-Pack)',
      asin: 'B0SAMPLE001',
      category: 'Home & Kitchen',
      notes: 'Great review velocity in sample data.',
      supplierCost: 4.2,
      sellingPrice: 14.99,
      status: 'GOOD'
    }
  });

  const productB = await prisma.product.create({
    data: {
      title: 'Resistance Bands Set',
      asin: 'B0SAMPLE002',
      category: 'Sports & Outdoors',
      notes: 'Watch for high competition in Q4.',
      supplierCost: 6.75,
      sellingPrice: 18.99,
      status: 'WATCHLIST'
    }
  });

  const productC = await prisma.product.create({
    data: {
      title: 'Pet Grooming Glove',
      asin: 'B0SAMPLE003',
      category: 'Pet Supplies',
      notes: 'Price trend is slightly down in sample.',
      supplierCost: 3.9,
      sellingPrice: 11.49,
      status: 'RISKY'
    }
  });

  const dates = ['2026-03-20', '2026-03-21', '2026-03-22'];

  for (const date of dates) {
    await prisma.dailySnapshot.create({
      data: {
        productId: productA.id,
        snapshotDate: new Date(date),
        sellingPrice: 14.49 + Math.random() * 1,
        notes: 'Sample daily snapshot'
      }
    });

    await prisma.dailySnapshot.create({
      data: {
        productId: productB.id,
        snapshotDate: new Date(date),
        sellingPrice: 18.29 + Math.random() * 1,
        notes: 'Sample daily snapshot'
      }
    });

    await prisma.dailySnapshot.create({
      data: {
        productId: productC.id,
        snapshotDate: new Date(date),
        sellingPrice: 10.99 + Math.random() * 1,
        notes: 'Sample daily snapshot'
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
