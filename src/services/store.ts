import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { 
  TypedUseSelectorHook, 
  useDispatch as dispatchHook, 
  useSelector as selectorHook 
} from 'react-redux';
=======
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
import { rootReducer } from './rootReducer';

const store = configureStore({
  reducer: rootReducer, 
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
