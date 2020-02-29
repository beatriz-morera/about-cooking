import React from 'react';
import { IonContent, IonHeader, IonPage, IonSearchbar } from '@ionic/react';
import './Tab1.css';

import Categories from '../components/Categories';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonSearchbar placeholder="Type Recipe Name Here" mode="ios" clearIcon="close-sharp" />
      </IonHeader>
      <IonContent>
        <Categories />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
