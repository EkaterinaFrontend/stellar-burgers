import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';
<<<<<<< HEAD

interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

// Асинхронный экшен для получения заказов конкретного пользователя
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => {
    return await getOrdersApi();
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const getOrdersState = (state: { orders: OrdersState }) => state.orders;
export default orderSlice.reducer;
=======
import { OrderStatus } from '@components';
import { isLabeledStatement } from 'typescript';
import exp from 'constants';

interface OrdersState {
    orders:TOrder[];
    isLoading:boolean;
    error:string | null;
}

const initialState:OrdersState ={
    orders:[],
    isLoading:false,
    error:null
};

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async() => {
        return await getOrdersApi();
    }
);

const orderSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchUserOrders.pending,(state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка загрузки заказов';
            });
    }
});

export const getOrdersState = (state:{ orders:OrdersState}) => state.orders;
export default orderSlice.reducer;
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
