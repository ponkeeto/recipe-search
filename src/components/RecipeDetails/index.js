import React from "react";

import { Grid } from "@mui/material";

import { useSelector } from "react-redux/es/exports";
import { selectRecipeDetails } from "./reducer";

const RecipeDetails = () => {
  const recipeDetails = useSelector(selectRecipeDetails);
  const { recipes, isLoading, hasError } = recipeDetails;
  console.log(recipes);
  if (isLoading) {
    return <>loading...</>;
  }

  return !hasError ? (
    <Grid container spacing={2}>
      {recipes.map((recipe) => {
        return (
          <Grid key={recipe.id} container flexDirection='column' item xs={3}>
            <img src={recipe.image} alt={recipe.title} />
            {recipe.title}
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <>oops! an error occured...</>
  );
};

export default RecipeDetails;
