/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";

import {
  Typography,
  Modal,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Grid,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { addFavorite, removeFavorite } from "../RecipeDetails/reducer";
import Drawer from "@mui/material/Drawer/Drawer";

const modalStyle = {
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

const drawerStyle = {
    height: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,};

const RecipeModal = (props) => {
  const matches = useMediaQuery("(min-width:600px)");
  const { open, handleClose, recipe, isLoading, dispatch } = props;
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const {
    id,
    title,
    image,
    imageType,
    instructions,
    sourceUrl,
    nutrition,
    extendedIngredients: ingredients,
  } = recipe;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFavorite = () => {
    if (!favorite) {
      dispatch(addFavorite({ id, title, image, imageType }));
    } else {
      dispatch(removeFavorite(id));
    }
    setFavorite(() => {
      return !favorite;
    });
  };

  const nutritionData = () => {
    if (nutrition) {
      const { caloricBreakdown, nutrients, weightPerServing } = nutrition;
      return (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "250px", overflow: "scroll" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Caloric Breakdown</b>
                </TableCell>
                <TableCell align="right">
                  <b>Amount</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(caloricBreakdown).map(([key, value]) => {
                return (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key.slice(7)}
                    </TableCell>
                    <TableCell align="right">{value}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>
                    Nutrients (per {weightPerServing.amount}
                    {weightPerServing.unit} serving)
                  </b>
                </TableCell>
                <TableCell align="right">
                  <b>Amount</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutrients.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.amount}
                    {row.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    return null;
  };

  const ingredientsData = () => {
    if (ingredients) {
      return (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "250px", overflow: "scroll" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Ingredient</b>
                </TableCell>
                <TableCell align="right">
                  <b>Amount</b>
                </TableCell>
                <TableCell align="right">
                  <b>Preparation</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.map((row, index) => {
                const { nameClean: name, measures, meta } = row;
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">
                      {measures.metric.amount} {measures.metric.unitShort}
                    </TableCell>
                    <TableCell align="right">
                      {meta.length > 0 &&
                        meta.map(
                          (meta, index) =>
                            `${meta}${index + 1 < meta.length && ", "}`
                        )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    return null;
  };

  const renderContent = (
    <Box sx={matches ? modalStyle : drawerStyle}>
      {!isLoading ? (
        <>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="favorite" onClick={handleFavorite}>
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Grid>
          </Grid>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Ingredients
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{ingredientsData()}</AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Instructions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ maxHeight: "250px", overflow: "scroll" }}>
                {instructions}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Nutrition
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{nutritionData()}</AccordionDetails>
          </Accordion>
          <a href={sourceUrl} target="_blank">
            Check out the website
          </a>
        </>
      ) : (
        <>loading...</>
      )}
    </Box>
  );

  return matches ? (
    <Modal open={open} onClose={handleClose}>
      {renderContent}
    </Modal>
  ) : (
    <Drawer anchor="top" open={open} onClose={handleClose}>
      {renderContent}
    </Drawer>
  );
};

export default RecipeModal;
