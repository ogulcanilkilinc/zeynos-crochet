import { NextRequest, NextResponse } from 'next/server';
import ordersData from '@/data/orders.json';
import type { Order } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get('orderNumber');

  if (!orderNumber || orderNumber.trim().length === 0) {
    return NextResponse.json(
      { error: 'Order number is required' },
      { status: 400 }
    );
  }

  const orders = ordersData as unknown as Order[];
  const order = orders.find(
    (o) => o.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase()
  );

  if (!order) {
    return NextResponse.json(
      { error: 'Order not found', orderNumber: orderNumber.trim() },
      { status: 404 }
    );
  }

  return NextResponse.json(order, { status: 200 });
}
