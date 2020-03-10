import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IonCard, IonImg, IonCardSubtitle } from '@ionic/react';

import { selectFeatured } from '../../store/selectors';
import { loadFeatured } from '../../store/features/featuredSlice';
import Recipe from '../../models/recipe';

import classes from './Featured.module.css';

const Featured: React.FC = () => {
  const featured = useSelector(selectFeatured);
  const dispatch = useDispatch();
  useEffect(() => dispatch<any>(loadFeatured()), [dispatch]);

  const tagsHandler = (str: string) => {
    if (str) {
      return `* ${str.split(',')[0]}`;
    }
    return null;
  };

  return (
    <>
      {featured.map((recipe: Recipe) => (
        <section key={recipe.idMeal}>
          <h5 className={classes.label}>Featured</h5>
          <IonCard>
            <IonImg src={recipe.strMealThumb} />
            <div className={classes.info}>
              <h4 className={classes.name}>{recipe.strMeal}</h4>
              <IonCardSubtitle mode="ios">
                {recipe.strCategory} * {recipe.strArea} {tagsHandler(recipe.strTags)}
              </IonCardSubtitle>
            </div>
          </IonCard>
        </section>
      ))}
    </>
  );
};

export default Featured;
