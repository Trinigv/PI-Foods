import React, { useEffect, useState } from 'react'; 
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendRecipes, sortAlphabetically, sortByHealthscore } from '../../Redux/actions';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import DietFilter from './DietFilter';
import Pagination from './Pagination'


let prevId = 1; 

export default function Cards() {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.totalRecipes); 

    const [order, setOrder] = useState('')

    const [page, setPage] = useState(1);
    const[recipesPage, setRecipesPage] = useState(9)

    const quantity = page * recipesPage; 
    const firstRecipePage = quantity - recipesPage;
    const showRecipesPage = recipesState.slice(firstRecipePage, quantity);
    
    const paged = function(pageNumber) {
        setPage(pageNumber)
    }

    function handleEvent(e) {
        e.preventDefault()
        dispatch(sortByHealthscore(e.target.value))
        setPage(1)
    }

    function handleEventAlphabet(e) {
        e.preventDefault()
        dispatch(sortAlphabetically(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getBackendRecipes());
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    useEffect(() => {
        dispatch(getBackendRecipes())
    },[dispatch])
    
    
    
    return (
        <div> 
            <div> <SearchBar> </SearchBar>  </div> 
            <div> <DietFilter></DietFilter></div>
            Sort by Healthscore:<div><button value='MaxtoMin' onClick={e => handleEvent(e)}>From Max to Min</button></div> <button value='MinToMax' onClick={e => handleEvent(e)}>From Min to Max</button>
            <div><button value='AZ' onClick={e => handleEventAlphabet(e)}>Sort from A to Z </button></div> <div><button value='ZA'  onClick={e => handleEventAlphabet(e)}>Sort from Z to A</button></div>
            <div> <Link to='/create'> <button>Create your own recipe</button> </Link> </div> 
            <button onClick={handleClick}>Refresh</button>
            <Pagination recipesPage={recipesPage} recipesState={recipesState.length} paged={paged}/>  
                {showRecipesPage.length > 0 && showRecipesPage.map(recipe =>
                 <SingleRecipe key={prevId++} 
                 image={recipe.image} //todas deben tener img por default
                 title={recipe.title}
                 diets = {recipe.diets}
                 id={recipe.id}/> //arreglar este error 
                )}
        </div>
    )
}