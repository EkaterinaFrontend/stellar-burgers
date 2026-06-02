import { useEffect } from 'react';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

// Импорт компонентов и страниц по вашим алиасам @
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { 
  ConstructorPage, 
  Feed, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  ProfileOrders, 
  NotFound404 
} from '@pages';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, getIngredientsState } from '../../services/ingredientsSlice';
import { checkUserAuth, getAuthState } from '../../services/authSlice';

// Компонент защиты роутов
const ProtectedRoute = ({ onlyUnAuth, children }: { onlyUnAuth?: boolean; children: React.ReactElement; }) => {
  const { user, isAuthChecked } = useSelector(getAuthState);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ИСПРАВЛЕНО: Убрали дублирующие переменные-заглушки, берем всё из стора
  const { ingredients, isLoading: isIngredientsLoading, error } = useSelector(getIngredientsState);

  // ИСПРАВЛЕНО: Заменили на корректное имя свойства backgroundLocation, как в вашем стейте
  const background = location.state && location.state.backgroundLocation;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      
      {/* 
        ИСПРАВЛЕНО: Убрали лишние внешние проверки условий, 
        теперь вся логика загрузки ингредиентов находится строго внутри рендера маршрута '/'
      */}
      <Routes location={background || location}>
        <Route 
          path='/' 
          element={
            isIngredientsLoading ? (
              <Preloader />
            ) : error ? (
              <div className={`${styles.error} text text_type_main-medium pt-4`}>
                {error}
              </div>
            ) : ingredients.length > 0 ? (
              <ConstructorPage />
            ) : (
              <div className={`${styles.title} text text_type_main-medium pt-4`}>
                Нет ингредиентов
              </div>
            )
          } 
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        
        <Route path='/login' element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        } />
        <Route path='/register' element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        } />
        <Route path='/forgot-password' element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        } />
        <Route path='/reset-password' element={
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        } />
        
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/profile/orders' element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        } />
        <Route path='/profile/orders/:number' element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        } />
        
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Рендеринг модальных окон при наличии фонового маршрута */}
      {background && (
        <Routes>
          <Route path='/feed/:number' element={
            <Modal title='Информация о заказе' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          } />
          <Route path='/ingredients/:id' element={
            <Modal title='Детали ингредиента' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          } />
          <Route path='/profile/orders/:number' element={
            <ProtectedRoute>
              <Modal title='Информация о заказе' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          } />
        </Routes>
      )}
    </div>
  );
};

export default App;
