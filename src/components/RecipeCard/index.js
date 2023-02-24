/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { getRecipeInfo, selectRecipeInfo } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RecipeCard = (props) => {
  const { id, image, title } = props;
  const [open, setOpen] = useState(false);

  const recipeInfo = useSelector(selectRecipeInfo);
  const dispatch = useDispatch();

  const { recipeInfo: recipe, isLoading } = recipeInfo;
  const { instructions, sourceUrl, nutrition } = recipe;
  console.log(nutrition);

  const handleOpen = () => {
    dispatch(getRecipeInfo(id));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const renderModal = (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {!isLoading ? (
          <>
            <Typography variant="h4" component="h2">
              {title}
            </Typography>
            {instructions}
            <a href={sourceUrl} target="_blank">
              Check out the website
            </a>
          </>
        ) : (
          <>loading...</>
        )}
      </Box>
    </Modal>
  );

  return (
    <>
      {renderModal}
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
