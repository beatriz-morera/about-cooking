import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "../firebase"
import { User } from '../models/user';

async function createUserAccount(user: User) {
  const {email} = user
  const userDB = await db.collection('users').doc(email).get()
  if(!userDB){
    await db.collection('usuarios').doc(email).set(user)
  }
}
export const userSignUp = createAsyncThunk('user/signup', createUserAccount);
