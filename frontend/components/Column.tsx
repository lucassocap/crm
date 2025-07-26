import { Draggable } from 'react-beautiful-dnd';
import OrderCard from './OrderCard';
import { Order } from '../lib/api';

interface Props {
  orders: Order[];
}

export default function Column({ orders }: Props) {
  return (
    <div className="space-y-2">
      {orders.map((order, index) => (
        <Draggable draggableId={order.id.toString()} index={index} key={order.id}>
          {provided => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <OrderCard order={order} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}
