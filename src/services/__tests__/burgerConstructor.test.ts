import { UnknownAction } from '@reduxjs/toolkit';

const constructorSlice = require('../constructorSlice');
const constructorReducer = constructorSlice.default || constructorSlice;
const { addIngredient, removeIngredient, clearConstructor, moveIngredient } = constructorSlice;

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
    const unknownAction: UnknownAction = { type: 'UNKNOWN' };
    const result = constructorReducer(undefined, unknownAction);
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
      image_large: 'https://yandex.net',
      image_mobile: 'https://yandex.net'
    };
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action as UnknownAction);

    expect(state.bun).toBeTruthy();
    expect(state.bun!._id).toBe(mockBun._id);
    expect(state.bun!.name).toBe(mockBun.name);
    expect(typeof state.bun!.id).toBe('string');
    expect(state.bun!.id.length).toBeGreaterThan(0);
  });

  test('должен обрабатывать экшен addIngredient для начинки', () => {
    const mockIngredient = { 
      _id: '2', 
      name: 'Бифштекс', 
      type: 'main', 
      price: 200, 
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      image: 'https://yandex.net',
      image_large: 'https://yandex.net',
      image_mobile: 'https://yandex.net'
    };
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action as UnknownAction);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe(mockIngredient._id);
    expect(state.ingredients[0].name).toBe(mockIngredient.name);
    expect(typeof state.ingredients[0].id).toBe('string');
    expect(state.ingredients[0].id.length).toBeGreaterThan(0);
  });

  test('должен обрабатывать экшен removeIngredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ 
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
        image_large: 'https://yandex.net',
        image_mobile: 'https://yandex.net'
      }]
    };
    const action = removeIngredient('unique-id'); 
    const state = constructorReducer(stateWithIngredient as any, action as UnknownAction);

    expect(state.ingredients).toHaveLength(0);
  });

  test('должен обрабатывать экшен clearConstructor', () => {
    const filledState = {
      bun: { name: 'Булка' },
      ingredients: [{ name: 'Начинка' }]
    };
    const action = clearConstructor();
    const state = constructorReducer(filledState as any, action as UnknownAction);

    expect(state).toEqual(initialState);
  });

  test('должен обрабатывать экшен moveIngredient (изменение порядка)', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Бифштекс', id: 'id-1' },
        { _id: '2', name: 'Соус', id: 'id-2' }
      ]
    };
    
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const state = constructorReducer(stateWithIngredients as any, action as UnknownAction);

    expect(state.ingredients[0].id).toBe('id-2'); 
    expect(state.ingredients[1].id).toBe('id-1'); 
  });
});
