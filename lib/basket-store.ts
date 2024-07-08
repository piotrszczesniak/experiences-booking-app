import { create } from 'zustand';

type BasketStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

const useBasketStore = create<BasketStore>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useBasketStore;
