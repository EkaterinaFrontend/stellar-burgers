import constructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor
} from '../constructorSlice';

interface ConstructorState {
  bun: any | null;
  ingredients: any[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

describe('Редьюсер constructorSlice', () => {
  test('должен возвращать начальное состояние при экшене UNKNOWN', () => {
    const result = constructorReducer(undefined, { type: 'UNKNOWN' } as any);
    expect(result).toEqual(initialState);
  });

  test('должен обрабатывать экшен addIngredient для булки', () => {
    const mockBun = {
      _id: '1',
      name: 'Краторная булка',
      type: 'bun',
      price: 100,
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      image: 'https://yandex.net',
      image_mobile: 'https://yandex.net',
      image_large: 'https://yandex.net'
    };
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual(mockBun);
  });

  test('должен обрабатывать экшен addIngredient для начинки', () => {
    const mockIngredient = {
      _id: '2',
      name: 'Бифштекс',
      type: 'main',
      price: 200,
      id: 'unique-id',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      image: 'https://yandex.net',
      image_mobile: 'https://yandex.net',
      image_large: 'https://yandex.net'
    };
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toContainEqual(mockIngredient);
  });

  test('должен обрабатывать экшен removeIngredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [
        {
          _id: '2',
          name: 'Бифштекс',
          type: 'main',
          price: 200,
          id: 'unique-id',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          image: 'https://yandex.net',
          image_mobile: 'https://yandex.net',
          image_large: 'https://yandex.net'
        }
      ]
    };
    const action = removeIngredient('unique-id');
    const state = constructorReducer(stateWithIngredient as any, action);

    expect(state.ingredients).toHaveLength(0);
  });

  test('должен обрабатывать экшен clearConstructor', () => {
    const filledState = {
      bun: { name: 'Булка' },
      ingredients: [{ name: 'Начинка' }]
    };
    const action = clearConstructor();
    const state = constructorReducer(filledState as any, action);

    expect(state).toEqual(initialState);
  });
});
