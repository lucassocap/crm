import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import create from 'zustand';
import Column from './Column';
import { fetchOrders, updateOrder, Order } from '../lib/api';

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
    await updateOrder(id, status);
  },
}));

const columns: Record<string, Order['status']> = {
  pending: 'pending',
  'in-progress': 'in-progress',
  completed: 'completed',
};

export default function KanbanBoard() {
  const { orders, fetch, move } = useStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const id = Number(result.draggableId);
    const newStatus = result.destination.droppableId as Order['status'];
    move(id, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Object.entries(columns).map(([key, status]) => (
          <Droppable droppableId={status} key={status}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white dark:bg-gray-800 p-2 rounded shadow">
                <h2 className="font-semibold mb-2 capitalize">{status.replace('-', ' ')}</h2>
                <Column orders={orders.filter(o => o.status === status)} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
