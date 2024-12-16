import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productAdminReducer from './slices/productAdminSlice';
import authReducer from 'store/slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
  blacklist: [''],
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  productAdmin: productAdminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
