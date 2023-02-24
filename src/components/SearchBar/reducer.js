import { createSlice } from "@reduxjs/toolkit";

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        category: '',
        searchTerm: ''
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        clearSearchTerm: state => {
            state.category = ''
            state.searchTerm = ''
        }
    }
})

export const { setCategory, setSearchTerm, clearSearchTerm } = searchBarSlice.actions

export const selectCategory = (state) => state.searchBar.category
export const selectSearchTerm = (state) => state.searchBar.searchTerm

export default searchBarSlice.reducer