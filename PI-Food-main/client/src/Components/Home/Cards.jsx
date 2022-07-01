import React, { useEffect} from 'react'; 
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendRecipes, sortAlphabetically, sortByHealthscore } from '../../Redux/actions';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import DietFilter from './DietFilter';


export default function Cards() {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.totalRecipes) 


    function handleEvent(e) {
        e.preventDefault()
        dispatch(sortByHealthscore(e.target.value))
    }

    function handleEventAlphabet(e) {
        e.preventDefault()
        dispatch(sortAlphabetically(e.target.value))
    }
    
    useEffect(() => {
        dispatch(getBackendRecipes())
    },[dispatch])
    return (
        <div> 
            <div> <SearchBar> </SearchBar>  </div> 
            <div> <DietFilter></DietFilter></div>Sort by Healthscore:<div><button value='MaxtoMin' onClick={e => handleEvent(e)}>From Max to Min</button></div> <button value='MinToMax' onClick={e => handleEvent(e)}>From Min to Max</button>
            <div><button value='AZ' onClick={e => handleEventAlphabet(e)}>Sort from A to Z </button></div> <div><button value='ZA'  onClick={e => handleEventAlphabet(e)}>Sort from Z to A</button></div>
            <div> <Link to='/create'> <button>Create your own recipe</button> </Link> </div> 
                {recipesState.length > 0 && recipesState.map(recipe => 
                 <SingleRecipe 
                 image={recipe.image} //todas deben tener img por default
                 title={recipe.title}
                 diets = {recipe.diets}
                 key={recipe.id}/>)}
        </div>
    )
}