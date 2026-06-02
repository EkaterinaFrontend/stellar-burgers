import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/services/store';
import { fetchUserOrders, getOrdersState } from 'src/services/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  
  const { orders, isLoading } = useSelector(getOrdersState);

  // Запрашиваем историю заказов пользователя при монтировании компонента
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // Пока данные загружаются, отображаем спиннер
  if (isLoading) {
    return <Preloader />;
  }

  // Передаем полученные заказы в UI-компонент страницы
  return <ProfileOrdersUI orders={orders} />;
};
