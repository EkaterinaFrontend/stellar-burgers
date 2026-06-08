import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/feedSlice';
import { getIngredientsState } from '../../services/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.feed);

  const { ingredients } = useSelector(getIngredientsState);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading || !orders.length || !ingredients.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
