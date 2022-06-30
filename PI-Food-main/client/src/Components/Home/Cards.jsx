import React, { useEffect} from 'react'; 
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendRecipes } from '../../Redux/actions';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import DietFilter from './DietFilter';


export default function Cards() {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.totalRecipes) 
    console.log(recipesState)
    
    useEffect(() => {
        dispatch(getBackendRecipes())
    },[dispatch])
    return (
        <div> 
            <div> <SearchBar> </SearchBar>  </div> 
            <div> <DietFilter></DietFilter> </div>
            <div> <Link to='/create'> <button>Create your own recipe</button> </Link> </div> 
                {recipesState.length > 0 && recipesState.map(recipe => 
                 <SingleRecipe 
                 image={recipe.image}
                 title={recipe.title}
                 diets = {recipe.diets}
                 key={recipe.id}/>)}
        </div>
    )
}