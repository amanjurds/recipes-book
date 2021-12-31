import React, { useState, useEffect } from 'react';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import About from './About';
import Navbar from './Navbar';

//creating a context to pass values
export const RecipeContext = React.createContext();

//const LOCAL_STORAGE_KEY = 'recipesBook.recipes';

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);

  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);


  useEffect(() => {
    // const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if(recipesJSON != null)
    //   setRecipes(JSON.parse(recipesJSON));

    //fetching json data on loading
    fetch('http://localhost:8000/recipes')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setRecipes(data);
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  // }, [recipes]);

  
  const recipeContextValue = {
    handleRecipesAdd,
    handleRecipesDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch
  };


  function handleRecipeSearch(searchedRecipes) {
    setRecipes(searchedRecipes);
  }

  function handleRecipeChange(id, newRecipe) {
    const newRecipes = [...recipes];
    const index = recipes.findIndex(recipe => recipe.id === id);
    newRecipes[index] = newRecipe;
    setRecipes(newRecipes);
    fetch(`http://localhost:8000/recipes/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(newRecipe)
        });

    console.log(JSON.stringify(newRecipe));
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipesAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      cookTime: '',
      servings: 1,
      instructions: '',
      ingredients: [
        {id: uuidv4(), name: '', amount: ''}
      ]
    }
    setRecipes([...recipes, newRecipe]);
    setSelectedRecipeId(newRecipe.id);

    fetch('http://localhost:8000/recipes', {          //adding to JSON file, using fetch, POST method
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(newRecipe)
        }).then(() => {
            console.log('new recipe added');
        })
        .catch(err => {
            console.log(err);
        })
  }

  function handleRecipesDelete(id) {
    setRecipes( recipes.filter(recipe => recipe.id !== id) );
    console.log(id);
    fetch('http://localhost:8000/recipes/' + id, {
            method: 'DELETE'
        })
  }


  return (
    <RecipeContext.Provider value={recipeContextValue}>

      <Navbar />

      <RecipeList recipes={recipes} />

      {selectedRecipe ? <RecipeEdit recipe={selectedRecipe} /> : <About recipes={recipes} />}

    </RecipeContext.Provider>
  )
};


const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    cookTime: '1:45',
    servings: 4,
    instructions: "1. Marinate chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {id: 1, name: 'Chicken', amount: '2 Pounds'},
      {id: 2, name: 'Salt', amount: '1 Tbs'}
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    cookTime: '0:45',
    servings: 2,
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {id: 1, name: 'Pork', amount: '1 Pounds'},
      {id: 2, name: 'Peprika', amount: '2 Tbs'}
    ]
  }
];

export default App;