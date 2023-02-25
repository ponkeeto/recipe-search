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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [expanded, setExpanded] = useState(false);

  const recipeInfo = useSelector(selectRecipeInfo);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(getRecipeInfo(id));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderModal = () => {
    const { recipeInfo: recipe, isLoading } = recipeInfo;
    const {
      instructions,
      sourceUrl,
      nutrition,
      extendedIngredients: ingredients,
    } = recipe;

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
                {ingredients.map((row) => {
                  const { nameClean: name, measures, meta } = row;
                  return (
                    <TableRow
                      key={name}
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
                            (meta, index) => `${meta}${index + 1 < meta.length && ", "}`
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

    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {!isLoading ? (
            <>
              <Typography variant="h4" component="h2">
                {title}
              </Typography>
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
      </Modal>
    );
  };

  return (
    <>
      {renderModal()}
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
