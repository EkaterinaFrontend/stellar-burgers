import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/ingredientsSlice';
import { getConstructorState } from '../../services/constructorSlice';

export const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector(getIngredientsState);

  const { bun, ingredients: constructorIngredients } =
    useSelector(getConstructorState);

  // Функция, которая автоматически добавляет свойство count к каждому ингредиенту
  const getIngredientsWithCount = (type: string) =>
    ingredients
      .filter((item) => item.type === type)
      .map((ingredient) => {
        let count = 0;
        if (ingredient.type === 'bun') {
          // Если ID булки совпадает с булкой в конструкторе — их всегда 2 (верхняя и нижняя)
          count = bun?._id === ingredient._id ? 2 : 0;
        } else {
          // Считаем, сколько раз эта начинка или соус добавлены в конструктор
          count = constructorIngredients.filter(
            (item) => item._id === ingredient._id
          ).length;
        }
        return { ...ingredient, count };
      });

  const buns = getIngredientsWithCount('bun');
  const sauces = getIngredientsWithCount('sauce');
  const mains = getIngredientsWithCount('main');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
