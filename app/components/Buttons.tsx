'use client';

import useCartStore from '@/lib/basket-store';

type ButtonsProps = {
  productId: number;
};

const Buttons = ({ productId }: ButtonsProps) => {
  const { increase, decrease } = useCartStore();

  return (
    <div>
      <button onClick={() => increase(productId)}>Increase</button>
      <button onClick={() => decrease(productId)}>Decrease</button>
    </div>
  );
};
export default Buttons;
