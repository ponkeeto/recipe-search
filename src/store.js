import { configureStore } from "@reduxjs/toolkit"
import searchBarReducer from './components/SearchBar/reducer'
import recipeDetailsReducer from './components/RecipeDetails/reducer'

export default configureStore({
    reducer: {
        searchBar: searchBarReducer,
        recipeDetails: recipeDetailsReducer,
    }
});