import React from 'react';
import { Link } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import { arrowForwardSharp } from 'ionicons/icons';

import { List } from '../../models/recipe';

import classes from './Area.module.css';

interface AreaProps {
  area: List;
}

const Area: React.FC<AreaProps> = ({ area }) => {
  return (
    <>
      <div className={classes.labelIconContainer}>
        <h5 className={classes.label}>{area.name}</h5>
        <Link to={`/area/${area.name}`} style={{ textDecoration: 'none' }}>
          <IonIcon icon={arrowForwardSharp} color="secondary" style={{ fontSize: '20px' }} />
        </Link>
      </div>

      <section className={classes.container}>
        <div className={classes.content}>
          {area.recipes.slice(0, 10).map(recipe => (
            <Link
              to={`/search/${recipe.idMeal}`}
              style={{ textDecoration: 'none' }}
              key={recipe.idMeal}
            >
              <div className={classes.card}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h4 className={classes.name}>{recipe.strMeal}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Area;
