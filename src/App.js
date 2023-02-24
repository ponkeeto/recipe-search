import "./App.css";
import RecipeDetails from "./components/RecipeDetails";

import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <RecipeDetails />
    </div>
  );
}

export default App;
