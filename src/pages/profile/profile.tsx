import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { getAuthState, updateUser } from 'src/services/authSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  
  // Получаем актуального пользователя из Redux
  const { user } = useSelector(getAuthState);
=======
import { getAuthState, updateUser } from '../../services/authSlice';
export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const {user} = useSelector(getAuthState);
   
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95

  // Инициализируем стейт формы значениями из стора
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  // Синхронизируем форму, если данные пользователя в сторе обновились
  useEffect(() => {
<<<<<<< HEAD
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
=======
    if (user){
    setFormValue((prevState) => ({
      ...prevState,
      name: user.name || '',
      email: user.email || ''
    }));
  }
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
  }, [user]);

 
  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    formValue.password !== '';

  // Отправка формы на сервер
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (isFormChanged) {
      dispatch(
        updateUser({
          email: formValue.email,
          name: formValue.name,
          ...(formValue.password ? { password: formValue.password } : {}) // Отправляем пароль, только если он введен
=======

    if (isFormChanged) {
      dispatch(
        updateUser({
          email:formValue.email,
          name:formValue.name,
          password:formValue.password
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
        })
      );
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
=======
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
>>>>>>> d416f996dd82186e20c96ebb6dfe8606c6e46d95
  };

  // Обработчик ввода в инпуты
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
