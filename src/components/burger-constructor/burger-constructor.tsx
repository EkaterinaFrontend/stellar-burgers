import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorState,
  clearConstructor
} from '../../services/constructorSlice';
import { getAuthState } from '../../services/authSlice';
import {
  orderBurger,
  getNewOrderState,
  clearOrderData
} from '../../services/newOrderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(getConstructorState);
  const { user } = useSelector(getAuthState);
  const { order, orderRequest } = useSelector(getNewOrderState);

  const constructorItems = useMemo(
    () => ({ bun, ingredients }),
    [bun, ingredients]
  );

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderIngredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(orderIngredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка при оформлении заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
