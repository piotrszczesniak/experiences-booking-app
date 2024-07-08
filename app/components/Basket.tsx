'use client';

import useBasketStore from '@/lib/basket-store';

const Basket = () => {
  const { count } = useBasketStore();

  return <div>Basket: {count} </div>;
};
export default Basket;
