import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice'; 

interface IngredientsState {
  ingredients: any[];
  isLoading: boolean; 
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

describe('Редьюсер ingredientsSlice', () => {
  test('должен возвращать начальное состояние при экшене UNKNOWN', () => {
    const result = ingredientsReducer(undefined, { type: 'UNKNOWN' } as any);
    expect(result).toEqual(initialState);
  });

  test('должен обрабатывать экшен fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState as any, action);
    
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('должен обрабатывать экшен fetchIngredients.fulfilled', () => {
    const mockIngredients = [{ _id: '1', name: 'Булка' }];
    const action = { 
      type: fetchIngredients.fulfilled.type, 
      payload: mockIngredients 
    };
    const state = ingredientsReducer(initialState as any, action);
    
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('должен обрабатывать экшен fetchIngredients.rejected', () => {
    const mockError = 'Ошибка загрузки';
    const action = { 
      type: fetchIngredients.rejected.type, 
      error: { message: mockError } 
    };
    const state = ingredientsReducer(initialState as any, action);
    
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
