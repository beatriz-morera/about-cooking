import { createSlice, SliceCaseReducers, Dispatch } from '@reduxjs/toolkit';

import { getCategories } from '../../services/recipes';
import Category from '../../models/category';

export interface State {
  list: Category[];
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: 'categories',
  initialState: {
    list: []
  },
  reducers: {
    loaded: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const selectCategories = (state: State) => state.list;

export const { loaded } = slice.actions;

export const loadCategories = () => (dispatch: Dispatch) =>
  getCategories().then(res => dispatch(loaded(res)));

export const reducer = slice.reducer;
