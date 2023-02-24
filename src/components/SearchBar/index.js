import React from "react";

import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Button,
  InputLabel,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  selectCategory,
  selectSearchTerm,
  setCategory,
  setSearchTerm,
} from "./reducer";

const SearchBar = () => {
  const category = useSelector(selectCategory);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const choices = ["Ingredient", "Cuisine", "Dish"];
  const searchLabel =
    category === "" ? "Select a category" : `Search by ${category}`;
  const isEmpty = category !== "" && searchTerm !== "";

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ margin: "20px" }}
    >
      <Grid item xs={2}>
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
      <Grid item xs={6}>
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
      <Grid item xs={2}>
        <Button
          variant="contained"
          fullWidth
          disabled={!isEmpty}
          style={{ padding: "10px" }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
