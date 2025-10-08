import { configureStore } from "@reduxjs/toolkit";
import { localStorage } from "redux-persist-webextension-storage";

import counterReducer from "./features/counter/counterSlice";
import settingsReducer from "./features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    settings: settingsReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
