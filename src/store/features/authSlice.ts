import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

import { User } from "../../models/user";
//import { userSignUp } from '../actions';

const STORAGE_KEY = 'user';

export interface State {
  user: User;
  loading: boolean;
  error: any;
}

function loadInitialState() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (json) {
    return JSON.parse(json);
  }
  return {
    user: {},
  };
}

const slice = createSlice<State, SliceCaseReducers<State>>({
  name: 'auth',
  initialState: {
    user: loadInitialState(),
    loading: false,
    error: null,
  },
  reducers: {
    singup: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
    },
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
    }
  },
  // extraReducers: builder => {
  //   builder.addCase(userSignUp.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   }),
  //   builder.addCase(userSignUp.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.user = action.payload;
  //   }),
  //   builder.addCase(userSignUp.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   }),
  // },
});

export const { login, singup, updateUser } = slice.actions;

export const selectAuth = (state: State) => state.user;

export const reducer = slice.reducer;
