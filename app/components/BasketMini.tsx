'use client';

import useBasketStore from '@/lib/basket-store';
import { BsBag } from 'react-icons/bs';
import styles from './BasketMini.module.scss';

const BasketMini = () => {
  const { count } = useBasketStore();
  return (
    <div className={styles.basket}>
      <BsBag size='40' className={styles.icon} />
      <div className={styles.count}>{count}</div>
    </div>
  );
};

export default BasketMini;
