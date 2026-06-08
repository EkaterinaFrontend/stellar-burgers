import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store'; // Импортируем кастомный dispatch
import { logoutUser } from '../../services/authSlice'; // Импортируем thunk для выхода (замените на ваш экшен)

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Диспатчим thunk очистки сессии и токенов
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        // После успешного логаута на сервере перенаправляем на страницу входа
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error('Ошибка при выходе из профиля:', error);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
