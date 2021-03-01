import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IonCard, IonCardContent, IonButton, IonInput, IonItem, IonLabel, IonText } from "@ionic/react";

import {User} from "../../models/user"
import { auth, firebase, db } from '../../firebase';
import { login, singup } from '../../store/features/authSlice';
import { selectAuth } from '../../store/selectors';
import {createUserAccount} from "../../services/accountCreator"

import google from './google.png';

import classes from "./Auth.module.css"

export default () => {
  const [registerActive, setRegisterActive] = useState(false)
  const [serverError, setServerError] = useState();

  const authUser = useSelector(selectAuth);
  const history = useHistory();

  useEffect(() => {
    if (authUser.email) {
      history.push('/search');
    }
  }, [history, authUser]);

  const dispatch = useDispatch();

  const { register, errors, handleSubmit } = useForm();

  const authHandler = async (data: User) => {
    const { email, password } = data;
    if(registerActive){
      try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const newUser = {
          name: res.user.displayName,
          email: res.user.email,
          password: res.user.uid,
          avatar: res.user.photoURL,
          favorites: []
        }
        dispatch(singup(newUser));
        await createUserAccount(newUser)
      } catch (error) {
        setServerError(error.message);
      }
     } else{
      try {
        const res = (await db.collection('users').doc(email).get()).data()
        if(res && (res.password === password)){
          const existingUser = {
            name: res.name,
            email: res.email,
            password: res.password,
            avatar: res.avatar,
            favorites: res.favorites
          }
          dispatch(login(existingUser));
        }
      } catch (error) {
        setServerError(error.message);
      }
      }
    }


  const authHandlerGoogle = async () => {
    setServerError(null);
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const answer = await auth.signInWithPopup(provider);
        const res = (await db.collection('users').doc(answer.user.email).get()).data()
        if(res && (res.password === answer.user.uid)){
          const existingUser = {
            name: res.name,
            email: res.email,
            password: res.password,
            avatar: res.avatar,
            favorites: res.favorites
          }
          dispatch(singup(existingUser));
          await createUserAccount(existingUser)
        }else{
          const newUser = {
            name: answer.user.displayName,
            email: answer.user.email,
            password: answer.user.uid,
            avatar: answer.user.photoURL,
            favorites: []
          }
          dispatch(singup(newUser));
          await createUserAccount(newUser)
        }
        console.log(res)
      } catch (error) {
        setServerError(error.message);
      }

  };

  return (
    <section className={classes.section}>
      <IonCard>
        <IonCardContent style={{textAlign: "center"}}>
        <br />
          <h1>{registerActive? "Register" : "Log in"}</h1>
          <br />
          {serverError && <div className={classes.alert}>{serverError}</div>}
          <form onSubmit={handleSubmit(authHandler)} className={classes.form}>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
              onChange={() => setServerError(null)}
              style={{ borderBottom: (errors.email || serverError) && '1px solid red' }}
              name="email"
              type="email"
              ref={register({
                required: '*This field is required'
              })}/>
            </IonItem>
            {errors.email && <p className={classes.error}>{errors.email.message}</p>}


            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
              onChange={() => setServerError(null)}
              style={{ borderBottom: (errors.password || serverError) && '1px solid red' }}
              type="password"
              name="password"
              ref={register({ required: '*This field is required' })}/>
            </IonItem>
            {errors.password && <p className={classes.error}>{errors.password.message}</p>}
            {registerActive && <p>Please enter at least 6 characters</p>}
            <br />
            <IonButton color="primary" expand="block" type="submit">{registerActive? "Register" : "Log in"}</IonButton>
          </form>
          <p style={{margin: "10px 0", textAlign: "center"}}>OR</p>
          <div className={classes.googleButton}>
            <IonButton color="light" expand="block" onClick={authHandlerGoogle}>
              <img src={google} alt="google" />
              Continue with Google
            </IonButton>
          </div>
          <br/>
          <IonText>
            <strong onClick={() => setRegisterActive(!registerActive)}>{registerActive? "Already have an account? Log in" : "Don't have an account yet? Register"}</strong>
          </IonText>
          <br/>
          <br/>
          </IonCardContent>
      </IonCard>
    </section>
  );
};
