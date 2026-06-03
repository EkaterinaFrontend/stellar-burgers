import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from './ingredientsSlice';
import { v4 as uuidv4 } from 'uuid'; 

export interface TConstructorIngredient extends IIngredient {
  id: string; // уникальный id для draggable-элементов
}

interface ConstructorState {
  bun: IIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: IIngredient) => {
        return { payload: { ...ingredient, id: uuidv4() } };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor } = constructorSlice.actions;
export const getConstructorState = (state: { burgerConstructor: ConstructorState }) => state.burgerConstructor;
export default constructorSlice.reducer;
