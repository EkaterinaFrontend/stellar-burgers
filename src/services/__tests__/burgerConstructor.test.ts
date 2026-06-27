import { UnknownAction } from '@reduxjs/toolkit';
import constructorReducer, { 
  addIngredient, 
  removeIngredient, 
  clearConstructor, 
  moveIngredient 
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

type TConstructorIngredient = TIngredient & { id: string };

interface LocalConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: LocalConstructorState = {
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
    const mockBun: TIngredient = { 
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
    // Исправлено: приводим к типу через unknown, чтобы TypeScript не ругался на проверку динамического id
    expect(typeof (state.bun as unknown as { id: string }).id).toBe('string');
    expect((state.bun as unknown as { id: string }).id.length).toBeGreaterThan(0);
  });

  test('должен обрабатывать экшен addIngredient для начинки', () => {
    const mockIngredient: TIngredient = { 
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
    const stateWithIngredient: LocalConstructorState = {
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
    const state = constructorReducer(stateWithIngredient, action as UnknownAction);

    expect(state.ingredients).toHaveLength(0);
  });

  test('должен обрабатывать экшен clearConstructor', () => {
    const filledState: LocalConstructorState = {
      bun: { 
        _id: '1', name: 'Булка', type: 'bun', price: 100, proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image: '', image_large: '', image_mobile: ''
      },
      ingredients: [{ 
        _id: '2', name: 'Начинка', type: 'main', price: 200, proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image: '', image_large: '', image_mobile: '', id: 'ing-id' 
      }]
    };
    const action = clearConstructor();
    const state = constructorReducer(filledState, action as UnknownAction);

    expect(state).toEqual(initialState);
  });

  test('должен обрабатывать экшен moveIngredient (изменение порядка)', () => {
    const stateWithIngredients: LocalConstructorState = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Бифштекс', type: 'main', price: 100, proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image: '', image_large: '', image_mobile: '', id: 'id-1' },
        { _id: '2', name: 'Соус', type: 'sauce', price: 50, proteins: 0, fat: 0, carbohydrates: 0, calories: 0, image: '', image_large: '', image_mobile: '', id: 'id-2' }
      ]
    };
    
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const state = constructorReducer(stateWithIngredients, action as UnknownAction);

    expect(state.ingredients[0].id).toBe('id-2'); 
    expect(state.ingredients[1].id).toBe('id-1'); 
  });
});
