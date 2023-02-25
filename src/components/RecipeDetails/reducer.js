import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadRecipes = createAsyncThunk(
  "recipeDetails/loadRecipes",
  async ({ category, searchTerm }) => {
    let query = "";
    const querySelection = () => {
      if (category === "Ingredient") {
        query = `ingredients=${searchTerm}`;
      } else if (category === "Cuisine") {
        query = `cuisine=${searchTerm}`;
      } else {
        query = `query=${searchTerm}`;
      }
      return query;
    };
    const searchQuery =
      category === "Ingredient" ? "findByIngredients" : "complexSearch";

    const apiKey = "6931ba0df2c64da0b3aaf7dac038aa9c";
    const requestURL = `https://api.spoonacular.com/recipes/${searchQuery}?${querySelection()}&number=12&apiKey=${apiKey}`;

    const response = await fetch(requestURL);
    const json = await response.json();
    return json;
  }
);

export const recipeDetailsSlice = createSlice({
  name: "recipeDetails",
  initialState: {
    recipes: [],
    favoriteRecipes: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteRecipes.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteRecipes.filter((recipe) => recipe.id === action.payload);
    },
  },
  extraReducers: {
    [loadRecipes.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadRecipes.fulfilled]: (state, action) => {
      if ("results" in action.payload) {
        state.recipes = action.payload.results;
      } else {
        state.recipes = action.payload;
      }
      state.isLoading = false;
      state.hasError = false;
    },
    [loadRecipes.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const { addFavorite, removeFavorite } = recipeDetailsSlice.actions;

export const selectRecipeDetails = (state) => state.recipeDetails;

export default recipeDetailsSlice.reducer;
