import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
// ИСПРАВЛЕНО: Импортируем настоящий корневой редьюсер
import { rootReducer } from './rootReducer';

const store = configureStore({
  reducer: rootReducer, // ИСПРАВЛЕНО: Теперь здесь настоящий редьюсер приложения
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
