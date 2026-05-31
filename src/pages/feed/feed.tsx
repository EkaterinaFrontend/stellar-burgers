import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, getFeedsState } from '../../services/feedSlice';

export const Feed: FC = () => {
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
};
