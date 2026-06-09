import { TIngredient } from '@utils-types';
import { ReactNode } from 'react';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
  ingredientsWithItems?: ReactNode;
};
