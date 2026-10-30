import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BagItem } from '../types/jewelry';

interface CartState {
  items: BagItem[];
  orderNote: string;
}

const initialState: CartState = {
  items: [
    {
      productId: 'silver-heritage-earrings',
      selectedOption: 'Traditional Shepherd Hook',
      quantity: 1,
    },
    {
      productId: 'traditional-tabzimt-fibula',
      quantity: 1,
    },
  ],
  orderNote: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        selectedOption?: string;
      }>
    ) => {
      const { productId, quantity, selectedOption } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.productId === productId && item.selectedOption === selectedOption
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, quantity, selectedOption });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; selectedOption?: string }>
    ) => {
      const { productId, selectedOption } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedOption === selectedOption
          )
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedOption?: string;
        delta: number;
      }>
    ) => {
      const { productId, selectedOption, delta } = action.payload;
      const item = state.items.find(
        (i) =>
          i.productId === productId && i.selectedOption === selectedOption
      );
      if (item) {
        const nextQty = item.quantity + delta;
        if (nextQty > 0) {
          item.quantity = nextQty;
        } else {
          state.items = state.items.filter((i) => i !== item);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.orderNote = '';
    },
    setOrderNote: (state, action: PayloadAction<string>) => {
      state.orderNote = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setOrderNote,
} = cartSlice.actions;

export default cartSlice.reducer;
