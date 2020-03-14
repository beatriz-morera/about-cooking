import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonSearchbar } from '@ionic/react';
import classes from './Search.module.css';

import { selectAreas } from '../store/selectors';
import { loadAreas } from '../store/features/areasSlice';

import Categories from '../components/Categories/Categories';
import Featured from '../components/Featured/Featured';
import Area from '../components/Area';

const Search: React.FC = () => {
  const areas = useSelector(selectAreas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadAreas());
  }, [dispatch]);
  return (
    <IonPage>
      <IonContent>
        <main className={classes.background}>
          <IonHeader mode="ios">
            <IonSearchbar placeholder="Type Recipe Name Here" mode="ios" clearIcon="close-sharp" />
          </IonHeader>
          <Categories />
          <Featured />
          {areas.map(area => (
            <Area area={area} key={area.name} />
          ))}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Search;
