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

    const apiKey = "6931ba0df2c64da0b3aaf7dac038aa9c";
    const requestURL = `https://api.spoonacular.com/recipes/${
      category === "Ingredients" ? "findByIngredients" : "complexSearch"
    }?${querySelection()}&apiKey=${apiKey}`;

    const response = await fetch(requestURL);
    const json = await response.json();
    return json;
  }
);

export const recipeDetailsSlice = createSlice({
  name: "recipeDetails",
  initialState: {
    recipes: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [loadRecipes.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadRecipes.fulfilled]: (state, action) => {
      state.recipes= action.payload.results;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadRecipes.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectRecipeDetails = (state) => state.recipeDetails;

export default recipeDetailsSlice.reducer;
