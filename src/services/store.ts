import { configureStore } from '@reduxjs/toolkit';
import { 
  TypedUseSelectorHook, 
  useDispatch as dispatchHook, 
  useSelector as selectorHook 
} from 'react-redux';
import { rootReducer } from './rootReducer';

// Конфигурация Redux Store с подключением корневого редьюсера
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// Экспорт типов для TypeScript
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Настроенные хуки для использования в компонентах вместо стандартных из react-redux
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
