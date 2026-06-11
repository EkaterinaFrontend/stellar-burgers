import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getAuthState } from '../../services/authSlice';
export const AppHeader: FC = () => {
  const { user } = useSelector(getAuthState);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
