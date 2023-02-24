import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export function loadRecipes(category, searchTerm) {
  createAsyncThunk("loadRecipes", async () => {
    let query = "";
    const querySelection = () => {
      if (category === "Ingredient") {
        query = `ingredients=${searchTerm}`;
      } else if (category === "cuisine") {
        query = `cuisine=${searchTerm}`;
      } else {
        query = `query=${searchTerm}`;
      }
      return query;
    };
    const apiKey = '6931ba0df2c64da0b3aaf7dac038aa9c'
    const requestURL = `https://api.spoonacular.com/recipes/${
      category === "Ingredients" ? "findByIngredients" : "complexSearch"
    }?${querySelection()}&apiKey=${apiKey}`;
    console.log(requestURL)
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
      },
    });
    return response.json();
  });
}

const sliceOptions = {
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
      state.recipes = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadRecipes.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
};

export const recipeDetailsSlice = createSlice(sliceOptions);

export const selectRecipeDetails = (state) => state.recipeDetails.recipes;
