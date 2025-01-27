import React from 'react';
import {configureStore, combineReducers, AnyAction} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {Persistor, persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Slices
import {RootState} from '../dto/axios.dto';
import ThemeSlice from './slice/Theme/theme.slice';
import LikeSlice from './slice/Liked/like.slice';

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const combinedReducer = combineReducers<RootState>({
  theme: ThemeSlice.reducer,
  like: LikeSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === 'user/logout/fulfilled') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme','like'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor: Persistor = persistStore(store);

export function clearReduxPersist() {
  persistor.purge();
}

export function StoreProvider({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
