export interface Order {
  id: number;
  client_phone: string;
  brand: string;
  model: string;
  year: string;
  component: string;
  vin: string;
  address: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
  sensor_type: string;
  manufacturer_code: string;
  internal_part_number: string;
  position: string;
  application_notes: string;
  stock: number;
  price_usd: number;
  competitor_price: number;
  category: string;
  image_url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function updateOrder(id: number, status: string) {
  await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}
