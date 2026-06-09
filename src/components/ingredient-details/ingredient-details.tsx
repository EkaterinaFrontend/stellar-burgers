import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients, isLoading } = useSelector(getIngredientsState);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <div className='text text_type_main-medium text_color_inactive mt-10 text-center'>
        Ингредиент не найден
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
