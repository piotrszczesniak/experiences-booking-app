import { create } from 'zustand';

import { GetProductQuery } from '@/generated/graphql';

type Product = GetProductQuery['product'];
type BasketProduct = Product & { quantity: number };

type BasketStore = {
  count: number;
  products: Product[];
  basketProducts: BasketProduct[];
  increase: () => void;
  decrease: () => void;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: string) => void;
};

const useBasketStore = create<BasketStore>((set) => ({
  count: 0,
  products: [],
  basketProducts: [],

  increase: () => set((state) => ({ ...state, count: state.count + 1 })),

  decrease: () => set((state) => ({ ...state, count: state.count - 1 })),

  addToBasket: (product: Product) =>
    set((state) => {
      // update products
      const updatedProducts = [...state.products, product];

      // update basketProducts
      const mapProducts = new Map();
      updatedProducts.forEach((product) => {
        if (mapProducts.has(product?.databaseId)) {
          mapProducts.get(product?.databaseId).quantity += 1;
        } else {
          const newProduct = { ...product, quantity: 1 };
          mapProducts.set(product?.databaseId, newProduct);
        }
      });

      // convert Map(key, value) object to Array
      const updatedBasketProducts = Array.from(mapProducts.values());

      return {
        ...state,
        count: state.count + 1,
        products: updatedProducts,
        basketProducts: updatedBasketProducts,
      };
    }),

  removeFromBasket: (productId: string) =>
    set((state) => ({
      products: state.products.filter((product: any) => product?.id !== productId),
      count: state.count - 1,
    })),
}));

export default useBasketStore;
