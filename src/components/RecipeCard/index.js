import React from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const RecipeCard = (props) => {
  const { id, image, title } = props;
  return (
    <Card raised key={id} className="img">
      <CardActionArea onClick={() => console.log(title)}>
        <CardMedia image={image} title={title} />
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
