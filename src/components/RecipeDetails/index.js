import React from "react";

import { Grid } from "@mui/material";

import { useSelector } from "react-redux/es/exports";
import { selectRecipeDetails } from "./reducer";
import RecipeCard from "../RecipeCard";

const RecipeDetails = () => {
  const recipeDetails = useSelector(selectRecipeDetails);
  const { recipes, isLoading, hasError } = recipeDetails;

  if (isLoading) {
    return <>loading...</>;
  }

  return !hasError ? (
    <Grid container spacing={2} style={{ padding: "15px" }}>
      {recipes.map((recipe) => {
        return (
          <Grid key={recipe.id} container flexDirection="column" item xs={3}>
            <RecipeCard
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
            />
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <>oops! an error occured...</>
  );
};

export default RecipeDetails;
