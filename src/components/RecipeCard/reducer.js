import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRecipeInfo = createAsyncThunk(
  "recipeCard/getRecipeInfo",
  async (id) => {
    const apiKey = "6931ba0df2c64da0b3aaf7dac038aa9c";
    const requestURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`;

    const response = await fetch(requestURL);
    const json = await response.json();
    return json;
  }
);

export const recipeCardSlice = createSlice({
  name: "recipeCard",
  initialState: {
    recipeInfo: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [getRecipeInfo.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getRecipeInfo.fulfilled]: (state, action) => {
      state.recipeInfo = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [getRecipeInfo.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectRecipeInfo = (state) => state.recipeCard;

export default recipeCardSlice.reducer;
