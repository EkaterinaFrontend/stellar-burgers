import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  loginUserApi, 
  registerUserApi, 
  logoutApi, 
  getUserApi, 
  updateUserApi 
} from '../utils/burger-api';

export interface TUser {
  email: string;
  name: string;
}

interface AuthState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

// Асинхронные экшены
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: any) => {
    const res = await registerUserApi(data);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: any) => {
    const res = await loginUserApi(data);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await logoutApi();
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: any) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUser',
  async (_, { dispatch }) => {
    // Если в локалсторадже есть токен — пытаемся получить юзера
    if (localStorage.getItem('accessToken')) {
      try {
        const res = await getUserApi();
        dispatch(setUser(res.user));
      } catch (err) {
        // Если токен протух или невалиден — очищаем стейт
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      // Если токена нет вообще — проверка завершена, пользователя нет
      dispatch(setUser(null));
      dispatch(setAuthChecked(true));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Логин
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })
      
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      
      // Выход из системы
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      
      // Обновление данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления профиля';
      });
  }
});

export const { setUser, setAuthChecked } = authSlice.actions;
export const getAuthState = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;
