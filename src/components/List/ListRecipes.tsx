import React from 'react';
import { Link } from 'react-router-dom';

import { RecipeSummary } from '../../models/recipe';

import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonContent,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonHeader
} from '@ionic/react';
import { heartOutline, heartSharp } from 'ionicons/icons';

import classes from './List.module.css';

interface ListProps {
  recipes: RecipeSummary[];
  name: string;
}

const ListRecipes: React.FC<ListProps> = ({ name, recipes }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" color="secondary" />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <main className={classes.background}>
          <p className={classes.label}>{recipes?.length} recipes</p>
          {recipes?.map(recipe => (
            <Link
              to={`/search/${recipe.idMeal}`}
              style={{ textDecoration: 'none' }}
              key={recipe.idMeal}
            >
              <IonCard mode="ios">
                <div className={classes.imageContainer}>
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className={classes.image} />
                </div>
                <div className={classes.info}>
                  <h6 className={classes.name}>{recipe.strMeal}</h6>
                  <IonIcon icon={heartOutline} color="secondary" style={{ fontSize: '25px' }} />
                </div>
              </IonCard>
            </Link>
          ))}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ListRecipes;
