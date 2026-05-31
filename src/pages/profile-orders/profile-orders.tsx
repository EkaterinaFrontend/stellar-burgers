import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/services/store';
import { fetchUserOrders, getOrdersState } from 'src/services/ordersSlice';
import { Preloader } from '@ui';
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
  return <ProfileOrdersUI orders={orders} />;

};
