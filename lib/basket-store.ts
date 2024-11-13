import { create } from 'zustand';

import { GetProductQuery } from '@/generated/graphql';
import { ChangeEvent } from 'react';

type Product = GetProductQuery['product'];
type BasketProduct = Product & { quantity: number } & {
  eventDate: Date;
  eventTime: 'morning' | 'afternoon' | 'evening';
};

/** // todo
 *  [] add eventDate
 *  [] add eventTime
 *  [] add notes
 *
 */

type BasketStore = {
  count: number;
  products: Product[];
  basketProducts: BasketProduct[];
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  dateFrom: Date;
  dateTo: Date;
  setDateFrom: (e: ChangeEvent<HTMLInputElement>) => void;
  setDateTo: (e: ChangeEvent<HTMLInputElement>) => void;
  notes: string | '';
  setNotes: (notes: string | '') => void;
};

const useBasketStore = create<BasketStore>((set) => ({
  count: 0,
  products: [],
  basketProducts: [],
  notes: 'Hi team, can you pick us up from the airport?',

  setNotes: (notes) => set((state) => ({ ...state, notes })),

  dateFrom: new Date(),
  dateTo: new Date(),

  setDateFrom: (e) =>
    set((state) => {
      console.log(e);

      return { ...state, dateFrom: new Date(e.target.value) };
    }),

  setDateTo: (e) =>
    set((state) => {
      return { ...state, dateTo: new Date(e.target.value) };
    }),

  decrease: (productId) =>
    set((state) => {
      const productIndex = state.products.findIndex((item) => item?.databaseId === productId);

      const updatedProducts = productIndex !== -1 ? state.products.filter((_, index) => index !== productIndex) : state.products;

      const updatedBasketProducts = state.basketProducts
        .map((item) => {
          if (item.databaseId === productId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0);

      const newCount = Math.max(state.count - 1, 0);

      return {
        ...state,
        products: updatedProducts,
        basketProducts: updatedBasketProducts,
        count: newCount,
      };
    }),

  increase: (productId) =>
    set((state) => {
      const productIndex = state.products?.findIndex((product) => product?.databaseId === productId);

      let updatedProducts: Product[] = [];

      if (productIndex !== -1) {
        const productToAdd = state.products[productIndex];
        updatedProducts = [...state.products, productToAdd];
      }

      let updatedBasketProducts: BasketProduct[] = [];

      if (productIndex !== -1) {
        updatedBasketProducts = state?.basketProducts.map((item) => {
          if (item.databaseId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }

      return {
        ...state,
        count: state.count + 1,
        products: updatedProducts,
        basketProducts: updatedBasketProducts,
      };
    }),

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

  removeFromBasket: (productId) =>
    set((state) => {
      const productIndex = state?.products.findIndex((item) => item?.databaseId === productId);

      const updatedProducts = productIndex !== -1 ? state.products.filter((item) => item?.databaseId !== productId) : state.products;

      const productFound = state.basketProducts.find((item) => item.databaseId === productId);
      const productQuantity = productFound ? productFound.quantity : 0;

      const newCount = state.count - productQuantity;

      const updatedBasketProducts = state.basketProducts
        .map((item) => {
          if (item.databaseId === productId) {
            return { ...item, quantity: 0 };
          } else {
            return item;
          }
        })
        .filter((item) => item?.quantity > 0);

      return {
        ...state,
        count: newCount,
        products: updatedProducts,
        basketProducts: updatedBasketProducts,
      };
    }),
}));

export default useBasketStore;
