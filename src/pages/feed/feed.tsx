import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, getFeedsState } from '../../services/feedSlice';

export const Feed: FC = () => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  

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
=======
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
const { orders, isLoading } = useSelector(getFeedsState);

const handleGetFeeds = () => {
  dispatch(fetchFeed());
};

useEffect(() => {
  dispatch(fetchFeed());
}, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }
 return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds}/>;
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
};
//