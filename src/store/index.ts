import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import persistedReducer, { rootReducer } from './persistedReducer';

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(rootStore);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
