import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
 loginUserApi,
 registerUserApi,
 logoutApi,
 getUserApi,
 updateUserApi
} from '../utils/burger-api';

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (data:any) => {
        const res = await updateUserApi(data);
        return res.user;
    }
    
);
export interface TUser {
    email:string;
    name:string;
}

interface AuthState {
    user: TUser | null;
    isAuthChecked:boolean;
    isLoading: boolean; 
    error:string | null;
}

const initialState:AuthState = {
    user:null,
    isAuthChecked:false,
    isLoading:false,
    error:null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async(data:any) => {
        const res = await registerUserApi(data);
        return res.user;
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async(data:any) => {
        const res = await loginUserApi(data);
        return res.user
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async() => {
        await logoutApi()
    }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUser',
  async (_, { dispatch }) => {
    try {
      const res = await getUserApi();
      dispatch(setUser(res.user));
    } catch (err) {
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        }
    },

    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthChecked = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Ошибка авторизации';
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.user = action.payload;
            state.isAuthChecked = true;
        })
        .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    }
});

export const { setUser, setAuthChecked } = authSlice.actions;
export const getAuthState = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;