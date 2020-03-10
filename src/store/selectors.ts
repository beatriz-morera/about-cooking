import * as categories from './features/categoriesSlice';
import * as featured from './features/featuredSlice';
import { State } from './store';

export const selectCategories = (state: State) => categories.selectCategories(state.categories);

export const selectFeatured = (state: State) => featured.selectFeatured(state.featured);
