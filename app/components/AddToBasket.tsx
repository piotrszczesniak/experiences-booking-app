'use client';

import { GetProductQuery } from '@/generated/graphql';
import useBasketStore from '@/lib/basket-store';

type AddToBasketProps = {
  product: GetProductQuery['product'];
};

const AddToBasket = ({ product }: AddToBasketProps) => {
  const { addToBasket } = useBasketStore();

  return <button onClick={() => addToBasket(product)}>add to basket</button>;
};
export default AddToBasket;
