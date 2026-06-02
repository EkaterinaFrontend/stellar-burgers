import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getAuthState } from 'src/services/authSlice';

<<<<<<< HEAD
export const AppHeader: FC = () => {
  const { user } = useSelector(getAuthState);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
=======
import { useSelector } from '../../services/store';
import { getAuthState } from 'src/services/authSlice';

export const AppHeader: FC = () => {
const { user } = useSelector(getAuthState);

return <AppHeaderUI userName={user ? user.name : ''}/>;
};
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
