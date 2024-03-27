import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();
export interface cartItemsIdsState {
  cartItemsIds: number[];
}

const savedCart = localStorage.getItem("cart");

const initialState: cartItemsIdsState = {
  cartItemsIds: savedCart ? (JSON.parse(savedCart) as number[]) : [],
};

export const cartItemsIdsSlice = createSlice({
  name: "cartItemsIds",
  initialState,
  reducers: {
    addToCartItemSlice: (state, action: PayloadAction<number>) => {
      if (!state.cartItemsIds.includes(action.payload)) {
        state.cartItemsIds.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cartItemsIds));
      }
    },
    setNewCartItemsSlice: (state, action: PayloadAction<number[]>) => {
      state.cartItemsIds = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cartItemsIds));
    },
  },
});

export const { addToCartItemSlice, setNewCartItemsSlice } = cartItemsIdsSlice.actions;

export default cartItemsIdsSlice.reducer;
