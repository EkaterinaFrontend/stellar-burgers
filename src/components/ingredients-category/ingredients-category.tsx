import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // ИСПРАВЛЕНО: Берем актуальное состояние булки и ингредиентов из стора конструктора
  const { bun, ingredients: constructorIngredients } = useSelector(
    (state) => state.burgerConstructor
  );

  // ИСПРАВЛЕНО: Считаем количество добавленных ингредиентов на основе реальных данных из стора
  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    // Считаем соусы и начинки
    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    // Если в конструктор добавлена булка — её всегда 2 штуки (верхняя и нижняя)
    if (bun) counters[bun._id] = 2;

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
