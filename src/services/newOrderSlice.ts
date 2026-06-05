import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

interface NewOrderState {
  order: any | null;
  orderRequest: boolean;
  error: string | null;
}

const initialState: NewOrderState = {
  order: null,
  orderRequest: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'newOrder/orderBurger',
  async (ingredientIds: string[]) => {
    const res = await orderBurgerApi(ingredientIds);
    return res.order;
  }
);

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const { clearOrderData } = newOrderSlice.actions;
export const getNewOrderState = (state: { newOrder: NewOrderState }) =>
  state.newOrder;
export default newOrderSlice.reducer;
