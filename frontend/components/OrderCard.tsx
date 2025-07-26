import Image from 'next/image';
import { Order } from '../lib/api';
import OrderModal from './OrderModal';
import { useState } from 'react';

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded shadow" onClick={() => setOpen(true)}>
      <div className="flex items-center space-x-2">
        <div className="w-16 h-16 relative flex-shrink-0">
          <Image src={order.image_url} alt={order.sensor_type} fill className="object-cover rounded" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{order.year} {order.brand} {order.model}</p>
          <p className="text-xs text-gray-500">{order.sensor_type} - {order.position}</p>
          <p className="text-xs font-semibold">${order.price_usd.toFixed(2)} vs ${order.competitor_price.toFixed(2)}</p>
        </div>
      </div>
      <OrderModal order={order} open={open} onOpenChange={setOpen} />
    </div>
  );
}
