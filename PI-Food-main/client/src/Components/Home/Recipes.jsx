import React, { useEffect } from 'react'; 
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendRecipes } from '../../Redux/actions';
import SearchBar from './SearchBar';


export default function Cards() {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.totalRecipes) //useSelector trae estado de redux con recetas 
    //conecta react component con redux state, cuando modifico el estado de redux se modifica recipesState
    useEffect(() => {
        dispatch(getBackendRecipes())
    },[dispatch])
    return (
        <div> 
            <SearchBar/>
             {recipesState.length > 0 && recipesState.map(recipe => 
                 <SingleRecipe 
                 image={recipe.image}
                 title={recipe.title}
                 diets = {recipe.diets}
                 key={recipe.id}/>)}
        </div>
    )
}