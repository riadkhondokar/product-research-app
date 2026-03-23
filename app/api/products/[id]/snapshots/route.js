import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request, { params }) {
  const id = Number(params.id);
  const body = await request.json();

  const snapshot = await prisma.dailySnapshot.create({
    data: {
      productId: id,
      snapshotDate: new Date(body.snapshotDate),
      sellingPrice: Number(body.sellingPrice),
      notes: body.notes || null
    }
  });

  return NextResponse.json(snapshot, { status: 201 });
}
