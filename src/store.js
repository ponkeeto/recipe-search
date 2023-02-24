import { configureStore } from "@reduxjs/toolkit"
import searchBarReducer from './components/SearchBar/reducer'

export default configureStore({
    reducer: {
        searchBar: searchBarReducer
    }
});