'use client';

import useBasketStore from '@/lib/basket-store';

const Basket = () => {
  const { basketProducts, increase, decrease, count, removeFromBasket } = useBasketStore();

  if (count === 0) {
    return <p>Your basket is empty.</p>;
  }

  if (count > 0)
    return (
      <table style={{ border: '1px solid black', width: '100%', maxWidth: '700px', margin: '0 auto' }}>
        <tr>
          <th style={{ textAlign: 'left', border: '1px solid black' }}></th>
          <th style={{ textAlign: 'left', border: '1px solid black' }}>Name</th>
          <th style={{ textAlign: 'center', border: '1px solid black' }}>Quantity</th>
        </tr>

        {basketProducts.map((product) => {
          return (
            <tr key={product.databaseId}>
              <td style={{ textAlign: 'center', border: '1px solid black' }}>
                <button onClick={() => removeFromBasket(product.databaseId)}>Remove</button>
              </td>
              <td style={{ textAlign: 'center', border: '1px solid black' }}>{product.name}</td>
              <td style={{ textAlign: 'center', border: '1px solid black' }}>
                <button onClick={() => decrease(product.databaseId)}>-</button> {product.quantity}
                <button onClick={() => increase(product.databaseId)}>+</button>
              </td>
            </tr>
          );
        })}
      </table>
    );
};

export default Basket;
