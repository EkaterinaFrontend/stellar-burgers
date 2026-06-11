import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import authReducer from './authSlice';
import constructorReducer from './constructorSlice';
import newOrderReducer from './newOrderSlice';
import ordersReducer from './ordersSlice';
import feedReducer from './feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  orders: ordersReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  newOrder: newOrderReducer
});
