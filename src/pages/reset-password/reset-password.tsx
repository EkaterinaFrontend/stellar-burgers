import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordUI } from '@ui-pages';
import { resetPasswordApi } from '../../utils/burger-api';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('forgotPasswordVisited')) {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    if (password && token) {
      resetPasswordApi({ password, token })
        .then(() => {
          localStorage.removeItem('forgotPasswordVisited');
          navigate('/login');
        })
        .catch((err) => {
          setError(err.message || 'Ошибка при изменении пароля');
        });
    }
  };

  return (
    <ResetPasswordUI
      errorText={error || ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
