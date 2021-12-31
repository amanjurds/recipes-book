import React, { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa';

import { RecipeContext } from './App';

export default function About( {recipes} ) {

    const { handleRecipeSearch } = useContext(RecipeContext);

    const [allRecipes, setAllRecipes] = useState(recipes);
    function handleSearch(term) {

        fetch('http://localhost:8000/recipes')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setAllRecipes(data);
        })
        const searchedRecipes = allRecipes.filter(recipe => recipe.name.includes(term))
        //console.log(searchedRecipes)
        handleRecipeSearch(searchedRecipes);
    }

    return (
        <div className="recipe-about recipe-edit">
            <h1 className='about-title'>About</h1>
            <p className='about-p'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae pariatur saepe ipsam quas. Libero sit hic iusto debitis at molestias aliquid aut delectus dignissimos consequuntur facere iure ea, nulla fugit.</p>

            <div className='recipe-search-section'>
                <h4 className='recipe-search-title'>Search <FaSearch className='recipe-search-icon' /> Recipe</h4>

                <form>
                    <input type="text" name="recipe-search" id="recipe-search" onChange = { (e) => handleSearch(e.target.value) }/>
                </form>
            </div>
        </div>
    )
}
