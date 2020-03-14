import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IonCard, IonCardSubtitle, IonIcon } from '@ionic/react';
import { heartOutline, heartSharp } from 'ionicons/icons';

import { selectFeatured } from '../../store/selectors';
import { loadFeatured } from '../../store/features/featuredSlice';
import Recipe from '../../models/recipe';
import tagsHandler from '../../services/stringsFixer';

import classes from '../../theme/Featured.module.css';

const Featured: React.FC = () => {
  const featured = useSelector(selectFeatured);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadFeatured());
  }, [dispatch]);

  return (
    <>
      {featured.map((recipe: Recipe) => (
        <section key={recipe.idMeal}>
          <h5 className={classes.label}>Featured</h5>
          <IonCard mode="ios">
            <Link to={`/search/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </Link>

            <div className={classes.info}>
              <Link to={`/search/${recipe.idMeal}`} style={{ textDecoration: 'none' }}>
                <h4 className={classes.name}>{recipe.strMeal}</h4>
              </Link>

              <div className={classes.iconsTagsContainer}>
                <IonCardSubtitle
                  mode="ios"
                  color="secondary"
                  style={{ fontSize: '12px', marginTop: '5px' }}
                >
                  {recipe.strCategory} * {recipe.strArea} {tagsHandler(recipe.strTags)}
                </IonCardSubtitle>

                <IonIcon icon={heartOutline} color="secondary" style={{ fontSize: '25px' }} />
              </div>
            </div>
          </IonCard>
        </section>
      ))}
    </>
  );
};

export default Featured;
