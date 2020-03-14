import { createSlice, createSelector, SliceCaseReducers, Dispatch } from '@reduxjs/toolkit';

import { getRecipesByCategory } from '../../services/recipes';
import { RecipeSummary } from '../../models/recipe';

export interface State {
  list: {
    [name: string]: RecipeSummary[];
  };
  activeCategory?: string;
}

interface RootState {
  category: State;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: 'category',
  initialState: {
    list: {}
  },
  reducers: {
    categoryLoaded: (state, action) => {
      const { category, recipes } = action.payload;
      state.list[category] = recipes;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    }
  }
});

export const selectCategoryMap = (state: State) => state.list;
export const selectActiveCategory = (state: State) => state.activeCategory;
export const selectCategoryRecipes = createSelector(
  selectActiveCategory,
  selectCategoryMap,
  (id, list) => {
    if (!id) {
      return [];
    }
    return list[id];
  }
);

export const { categoryLoaded, setActiveCategory } = slice.actions;

export const loadCategory = (catego: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    category: { list }
  } = getState();

  if (!list[catego]) {
    const recipes = await getRecipesByCategory(catego);
    dispatch(categoryLoaded({ category: catego, recipes }));
  }

  dispatch(setActiveCategory(catego));
};

export const reducer = slice.reducer;
