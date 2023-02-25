import React from "react";

import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Button,
  InputLabel,
  Divider,
  useMediaQuery,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectSearchTerm,
  setCategory,
  setSearchTerm,
} from "./reducer";
import { loadRecipes } from "../RecipeDetails/reducer";

const SearchBar = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const category = useSelector(selectCategory);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const choices = ["Ingredient", "Cuisine", "Dish"];
  const searchLabel =
    category === "" ? "Select a category" : `Search by ${category}`;
  const isEmpty = category !== "" && searchTerm !== "";

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        style={{ margin: "20px 0", maxWidth: "100%" }}
      >
        <Grid
          item
          xs={matches ? 2 : 8}
          style={{ padding: matches ? "0 10px" : "10px 0" }}
        >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => {
                dispatch(setCategory(e.target.value));
              }}
            >
              {choices.map((choice, index) => (
                <MenuItem key={index} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={matches ? 5 : 8}
          style={{ padding: matches ? "0 10px" : "10px 0" }}
        >
          <FormControl variant="outlined" fullWidth>
            <InputLabel>{searchLabel}</InputLabel>
            <OutlinedInput
              onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
              }}
              label={searchLabel}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={matches ? 2 : 8}
          style={{ padding: matches ? "0 10px" : "10px 0" }}
        >
          <Button
            variant="contained"
            fullWidth
            disabled={!isEmpty}
            style={{ padding: "10px", width: '66%' }}
            onClick={() => {
              dispatch(loadRecipes({ category, searchTerm }));
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default SearchBar;
