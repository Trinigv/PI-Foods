import React, { useEffect, useState } from 'react'; 
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendRecipes, sortAlphabetically, sortByHealthscore } from '../../Redux/actions';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import DietFilter from './DietFilter';
import Pagination from './Pagination'
import './Home.css'


let prevId = 1; 

export default function Cards() {
    const dispatch = useDispatch()
    const recipesState = useSelector(state => state.totalRecipes); 

    const [order, setOrder] = useState('')

    const [page, setPage] = useState(1);
    const[recipesPage, setRecipesPage] = useState(9)

    const quantity = page * recipesPage; 
    const firstRecipePage = quantity - recipesPage;
    var showRecipesPage;
    showRecipesPage = recipesState.slice(firstRecipePage, quantity);
    
    if(typeof showRecipesPage === 'string'){ //When searching for name of unexisting recipe
        showRecipesPage ='Could not find recipes ❌'
    }
    
    if(showRecipesPage.length === 0) { //when searching for a diet that is not included
        showRecipesPage = 'Could not find recipes'
    }
    console.log(showRecipesPage)
    
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
        <div className='all'>
            <div className='body'> 
            <div className='searchHome'> 
                <div> <SearchBar> </SearchBar>  </div> 
                <div className='dietfilter'> <DietFilter></DietFilter></div>
            </div>
            <div className='buttons'>
            
                <button className='b' value='MaxtoMin' onClick={e => handleEvent(e)}>From Max to Min</button>
            
                <button className='b' value='MinToMax' onClick={e => handleEvent(e)}>From Min to Max</button>
            
                <button className='b' value='AZ' onClick={e => handleEventAlphabet(e)}>Sort from A to Z </button> 
            
                <button className='b' value='ZA'  onClick={e => handleEventAlphabet(e)}>Sort from Z to A</button>
            <div> 
            </div>
                <Link to='/create'> <button className='buttons' id='c'>Create your own recipe</button> </Link> </div> 
            <div className='paginationBack'>
                <Pagination recipesPage={recipesPage} recipesState={recipesState.length} paged={paged}/>
            </div>
            </div>
            <div className='cards' >
                { typeof showRecipesPage === 'object'  || showRecipesPage.length === 0 ? showRecipesPage?.map(recipe =>
                 <SingleRecipe  key={prevId++} 
                 image={recipe.image} 
                 title={recipe.title}
                 diets = {recipe.diets?.map(d => d + ' 🥑 ')}
                 id={recipe.id} /> 
                ) : <h2>{showRecipesPage}</h2> }
            </div>
            <button className='buttons' onClick={handleClick}>Refresh</button>
        </div>
    )
}