import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateMetrics } from '@/lib/metrics';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'ALL';

    const products = await prisma.product.findMany({
      where: {
        ...(status !== 'ALL' ? { status } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search } },
                { asin: { contains: search } },
                { category: { contains: search } }
              ]
            }
          : {})
      },
      include: {
        snapshots: {
          orderBy: { snapshotDate: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    const withMetrics = products.map((product) => {
      const latestSnapshotPrice = product.snapshots[0]?.sellingPrice;
      const currentPrice = latestSnapshotPrice ?? product.sellingPrice;
      const metrics = calculateMetrics({
        supplierCost: product.supplierCost,
        sellingPrice: currentPrice
      });

      return {
        ...product,
        currentPrice,
        metrics
      };
    });

    return NextResponse.json(withMetrics);
  } catch (error) {
    console.error('Failed to load products:', error);
    return NextResponse.json(
      {
        error: 'Could not load products right now. Please try again in a moment.'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const newProduct = await prisma.product.create({
      data: {
        title: body.title,
        asin: body.asin,
        category: body.category,
        notes: body.notes || null,
        supplierCost: Number(body.supplierCost),
        sellingPrice: Number(body.sellingPrice),
        status: body.status || 'WATCHLIST'
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      {
        error: 'Could not save the product. Please check your input and try again.'
      },
      { status: 500 }
    );
  }
}
