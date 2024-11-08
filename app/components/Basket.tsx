'use client';

import useBasketStore from '@/lib/basket-store';

const Basket = () => {
  const { basketProducts, products, increase, decrease } = useBasketStore();

  console.log(basketProducts);
  console.log(products);

  return (
    <ul>
      {basketProducts.map((product) => {
        return (
          <li key={product.databaseId}>
            {product.name} | <button onClick={() => decrease(product.databaseId)}>-</button> {product.quantity}
            <button onClick={() => increase(product.databaseId)}>+</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Basket;
