'use client';

import useBasketStore from '@/lib/basket-store';

const Basket = () => {
  const { basketProducts } = useBasketStore();

  return (
    <ul>
      {basketProducts.map((product) => {
        return (
          <li key={product.databaseId}>
            {product.name}, quantity: {product.quantity}
          </li>
        );
      })}
    </ul>
  );
};

export default Basket;
