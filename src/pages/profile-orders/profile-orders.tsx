import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, getOrdersState } from '../../services/ordersSlice';
import { getIngredientsState } from '../../services/ingredientsSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(getOrdersState);

  const { ingredients } = useSelector(getIngredientsState);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
