'use client';

import { GetProductQuery } from '@/generated/graphql';
import useBasketStore from '@/lib/basket-store';
import { ChangeEvent, useState } from 'react';

type AddToBasketProps = {
  product: GetProductQuery['product'];
};

const AddToBasket = ({ product }: AddToBasketProps) => {
  const { addToBasket } = useBasketStore();
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className='quantity-wrapper'>
        <button onClick={(e) => setQuantity((prev) => prev - 1)}>-</button>
        <input onChange={(e) => setQuantity(+e.target.value)} value={quantity} name='' id='' />
        <button onClick={(e) => setQuantity((prev) => prev + 1)}>+</button>
      </div>
      <div className='add-to-basket-wrapper'>
        <button onClick={() => addToBasket(product, quantity)}>add to basket</button>
      </div>
    </>
  );
};
export default AddToBasket;
