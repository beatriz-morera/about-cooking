import React from 'react';
import { IonContent, IonHeader, IonPage, IonSearchbar } from '@ionic/react';
import './Tab1.css';

import Categories from '../components/Categories/Categories';
import Featured from '../components/Featured/Featured';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonSearchbar placeholder="Type Recipe Name Here" mode="ios" clearIcon="close-sharp" />
      </IonHeader>
      <IonContent>
        <Categories />
        <Featured />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
