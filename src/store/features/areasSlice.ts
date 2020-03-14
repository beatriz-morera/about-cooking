import { createSlice, SliceCaseReducers, Dispatch } from '@reduxjs/toolkit';

import { getRecipesByAreas, getRecipesByArea } from '../../services/recipes';
import { List } from '../../models/recipe';

export interface State {
  list: List[];
}

interface RootState {
  areas: State;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: 'areas',
  initialState: {
    list: []
  },
  reducers: {
    loaded: (state, action) => {
      state.list = action.payload;
    },
    addArea: (state, action) => {
      state.list.push(action.payload);
    }
  }
});

export const selectAreas = (state: State) => state.list;

export const { loaded, addArea } = slice.actions;

export const loadAreas = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    areas: { list }
  } = getState();
  if (list.length <= 1) {
    const areas = await getRecipesByAreas();
    dispatch(loaded(areas));
  }
};

export const loadArea = (name: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    areas: { list }
  } = getState();
  if (!list.some(x => x.name === name)) {
    const recipes = await getRecipesByArea(name);
    dispatch(addArea({ name, recipes }));
  }
};

export const reducer = slice.reducer;
