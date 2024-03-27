import { configureStore } from "@reduxjs/toolkit";
import  cartItemsIdsReducer  from "./slices/cart-items-ids-slice";

export const store = configureStore({
  reducer: {
    cartItemsIds: cartItemsIdsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
