/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { getRecipeInfo, selectRecipeInfo } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import RecipeModal from "../RecipeModal";

const RecipeCard = (props) => {
  const { id, image, title, favoriteRecipes } = props;
  const [open, setOpen] = useState(false);

  const recipeInfo = useSelector(selectRecipeInfo);
  const dispatch = useDispatch();

  const { recipeInfo: recipe, isLoading } = recipeInfo;

  const handleOpen = () => {
    dispatch(getRecipeInfo(id));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <RecipeModal
        open={open}
        handleClose={handleClose}
        recipe={recipe}
        isLoading={isLoading}
        dispatch={dispatch}
        favoriteRecipes={favoriteRecipes}
      />
      <Card raised key={id} className="img" style={{ height: "100%" }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia component="img" height="250" image={image} alt={title} />
          <CardContent>
            <Typography>{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default RecipeCard;
