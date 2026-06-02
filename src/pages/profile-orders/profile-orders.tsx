import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/services/store';
import { fetchUserOrders, getOrdersState } from 'src/services/ordersSlice';
import { Preloader } from '@ui';
<<<<<<< HEAD

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
=======
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(getOrdersState);
  
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader/>
  }
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
  return <ProfileOrdersUI orders={orders} />;

};
