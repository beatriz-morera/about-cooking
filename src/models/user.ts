import { RecipeSummary } from "./recipe";

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
  favorites: RecipeSummary[];
}
