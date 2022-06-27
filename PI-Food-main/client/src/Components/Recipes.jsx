import React, { useEffect } from 'react'; 
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendRecipes } from '../Redux/actions';


export default function Cards() {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.totalRecipes) //useSelector trae estado de redux con recetas 
    //conecta react component con redux state, cuando modifico el estado de redux se modifica recipesState
    useEffect(() => {
        dispatch(getBackendRecipes())
    },[dispatch])

    return (
        <div> 
             {recipesState.length && recipesState.map(recipe => 
                 <SingleRecipe title={recipe.title} 
                 summary={recipe.summary}
                 healthScore = {recipe.healthScore}
                 diets = {recipe.diets}
                 image={recipe.image}
                 key={recipe.id}/>)}
        </div>
    )
}