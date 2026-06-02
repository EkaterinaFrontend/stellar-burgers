import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, getFeedsState } from '../../services/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  
  // Берем актуальные данные о ленте заказов из Redux-стора
  const { orders, isLoading } = useSelector((state) => state.feed);

  // Функция для ручного или повторного обновления ленты
  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  // Загружаем данные при монтировании компонента (первый заход на страницу)
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  // Пока данные загружаются, или если массив заказов еще пустой, показываем спиннер
  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  // Рендерим UI интерфейс ленты заказов, когда данные успешно получены
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
