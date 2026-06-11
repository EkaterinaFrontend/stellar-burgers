import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  getConstructorState
} from '../../services/constructorSlice';
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(getConstructorState);

    const dynamicCount =
      ingredient.type === 'bun'
        ? bun?._id === ingredient._id
          ? 2
          : 0
        : ingredients.filter((item) => item._id === ingredient._id).length;

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={dynamicCount}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
