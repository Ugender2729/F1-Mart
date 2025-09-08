import React from 'react';
import OrderDetailsClient from '@/components/orders/OrderDetailsClient';

// Generate static params for static export
export async function generateStaticParams() {
  // Return empty array for static export - pages will be generated on demand
  return [];
}

interface OrderDetailsProps {
  params: {
    id: string;
  };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ params }) => {
  return <OrderDetailsClient orderId={params.id} />;
};

export default OrderDetails;