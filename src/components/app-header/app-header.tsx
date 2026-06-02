import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getAuthState } from 'src/services/authSlice';

export const AppHeader: FC = () => {
  // Получаем данные пользователя из глобального стейта авторизации
  const { user } = useSelector(getAuthState);

  // Передаем имя пользователя (или пустую строку, если он не авторизован) в UI-компонент
  return <AppHeaderUI userName={user ? user.name : ''} />;
};
