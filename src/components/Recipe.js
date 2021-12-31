import React, { useContext } from 'react'
import IngredientList from './IngredientList';
import { RecipeContext } from './App';

export default function Recipe( props ) {
    const {name, cookTime, servings, instructions, ingredients, id} = props;
    const {handleRecipesDelete, handleRecipeSelect} = useContext(RecipeContext);
    
    return (
        <div className='recipe'>
            <div className='recipe__header'>
                <h3 className='recipe__title'>{name}</h3>
                <div>
                    <button className='btn btn--primary mr-1'
                        onClick={() => handleRecipeSelect(id)}>Edit</button>
                    <button className='btn btn--danger' 
                        onClick={() => handleRecipesDelete(id)}>Delete</button>
                </div>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label mr-1'>Cook Time:</span>
                <span className='recipe__value'>{cookTime}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label mr-1'>Servings:</span>
                <span className='recipe__value'>{servings}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label mr-1'>Instructions:</span>
                <div className='recipe__value recipe__instructions recipe__value--indented'>
                    {instructions}
                </div>
            </div>

            <div className='recipe__row'>
                <span className='recipe__label mr-1'>Ingridients:</span>
                <div className='recipe__value recipe__value--indented'>
                    <IngredientList ingredients={ingredients} />
                </div>
            </div>
        </div>
    )
}
