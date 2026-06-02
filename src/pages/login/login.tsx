import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { registerUser, getAuthState, loginUser } from 'src/services/authSlice';
=======
import { registerUser, getAuthState, loginUser } from '../../services/authSlice';
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(getAuthState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

     if(email && password) {
      dispatch(
          loginUser({
          email,
          password
          })
      );
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};