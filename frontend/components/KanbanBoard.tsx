import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import create from 'zustand';
import Column from './Column';
import { fetchOrders, updateOrder, Order } from '../lib/api';
import { Toaster, toast } from 'sonner';

interface State {
  orders: Order[];
  fetch: () => Promise<void>;
  move: (id: number, status: Order['status']) => void;
}

export const useStore = create<State>((set, get) => ({
  orders: [],
  fetch: async () => {
    const orders = await fetchOrders();
    set({ orders });
  },
  move: async (id, status) => {
    set({ orders: get().orders.map(o => (o.id === id ? { ...o, status } : o)) });
    try {
      await updateOrder(id, status);
      toast.success(`Order #${id} moved to ${status.replace('_', ' ')}`);
    } catch (err) {
      toast.error('Failed to update order');
    }
  },
}));

const columns: Record<string, Order['status']> = {
  pending: 'pending',
  in_progress: 'in_progress',
  completed: 'completed',
};

export default function KanbanBoard() {
  const { orders, fetch, move } = useStore();
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const id = Number(result.draggableId);
    const newStatus = result.destination.droppableId as Order['status'];
    move(id, newStatus);
  };

  const filtered = orders.filter(o => {
    const q = query.toLowerCase();
    return (
      o.brand.toLowerCase().includes(q) ||
      o.model.toLowerCase().includes(q) ||
      o.vin.toLowerCase().includes(q) ||
      o.sensor_type.toLowerCase().includes(q) ||
      o.manufacturer_code.toLowerCase().includes(q) ||
      o.internal_part_number.toLowerCase().includes(q)
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Toaster position="top-right" />
      <div className="mb-4 flex items-center justify-between">
        <input
          className="w-full md:w-1/3 px-2 py-1 border rounded mr-2 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Search orders..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Object.entries(columns).map(([key, status]) => (
          <Droppable droppableId={status} key={status}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white dark:bg-gray-800 p-2 rounded shadow">
                <h2 className="font-semibold mb-2 capitalize">{status.replace('_', ' ')}</h2>
                <Column orders={filtered.filter(o => o.status === status)} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
