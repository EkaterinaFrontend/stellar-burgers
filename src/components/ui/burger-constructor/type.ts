import { TNewOrder } from '@api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TNewOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};

type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};
