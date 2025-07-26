import * as Dialog from '@radix-ui/react-dialog';
import { Order } from '../lib/api';

interface Props {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderModal({ order, open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded">
          <Dialog.Title className="text-lg font-bold mb-2">Order #{order.id}</Dialog.Title>
          <p className="mb-1"><strong>Vehicle:</strong> {order.year} {order.brand} {order.model}</p>
          <p className="mb-1"><strong>VIN:</strong> {order.vin}</p>
          <p className="mb-1"><strong>Address:</strong> {order.address}</p>
          <p className="mb-1"><strong>Notes:</strong> {order.application_notes}</p>
          <p className="mb-1"><strong>Stock:</strong> {order.stock}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => onOpenChange(false)}>Close</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" disabled>Generate Invoice</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
