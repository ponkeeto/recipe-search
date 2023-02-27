import React, { useState } from "react";

import { Grid, Box, Tabs, Tab } from "@mui/material";

import { useSelector } from "react-redux/es/exports";
import { selectRecipeDetails } from "./reducer";
import RecipeCard from "../RecipeCard";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return value === index && children;
};

const RecipeDetails = () => {
  const recipeDetails = useSelector(selectRecipeDetails);
  const { recipes, favoriteRecipes, isLoading, hasError } = recipeDetails;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <>loading...</>;
  }

  if (hasError) {
    return <>oops! an error occured...</>;
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "0 10px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Results" />
            <Tab label="Favorites" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} style={{}}>
          <Grid container spacing={2} style={{ padding: "15px" }}>
            {recipes.map((recipe) => {
              return (
                <Grid
                  key={recipe.id}
                  container
                  flexDirection="column"
                  item
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <RecipeCard
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    favoriteRecipes={favoriteRecipes}
                  />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} style={{ padding: "15px" }}>
            {favoriteRecipes.map((recipe) => {
              return (
                <Grid
                  key={recipe.id}
                  container
                  flexDirection="column"
                  item
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <RecipeCard
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    favoriteRecipes={favoriteRecipes}
                  />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};

export default RecipeDetails;
