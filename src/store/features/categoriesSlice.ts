import { createSlice, SliceCaseReducers, Dispatch } from '@reduxjs/toolkit';

import { getCategories } from '../../services/recipes';
import Category from '../../models/category';

export interface State {
  list: Category[];
}

interface RootState {
  categories: State;
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

export const loadCategories = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    categories: { list }
  } = getState();
  if (list.length === 0) {
    const categories = await getCategories();
    dispatch(loaded(categories));
  }
};

export const reducer = slice.reducer;
