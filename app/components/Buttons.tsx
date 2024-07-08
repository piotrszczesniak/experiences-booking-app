'use client';

import useCartStore from '@/lib/basket-store';

const Buttons = () => {
  const { increase, decrease } = useCartStore();

  return (
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
};
export default Buttons;
