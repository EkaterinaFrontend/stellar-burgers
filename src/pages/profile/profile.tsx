import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAuthState, updateUser } from 'src/services/authSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  
  // Получаем актуального пользователя из Redux
  const { user } = useSelector(getAuthState);

  // Инициализируем стейт формы значениями из стора
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  // Синхронизируем форму, если данные пользователя в сторе обновились
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  // ИСПРАВЛЕНО: Вычисляем, изменились ли поля формы по сравнению со стором.
  // Кнопки «Сохранить» и «Отмена» появятся, если имя или email не совпадают с исходными, 
  // либо если пользователь начал вводить новый пароль.
  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    formValue.password !== '';

  // Отправка формы на сервер
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(
        updateUser({
          email: formValue.email,
          name: formValue.name,
          ...(formValue.password ? { password: formValue.password } : {}) // Отправляем пароль, только если он введен
        })
      );
    }
  };

  // ИСПРАВЛЕНО: Клик по кнопке «Отмена» возвращает поля в исходное состояние
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
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
