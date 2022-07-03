import React from 'react'; 
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getRecipeDetail } from '../../Redux/actions';
import './SingleRecipe.css'

//destructuring of components

export default function SingleRecipe(props) {

    const dispatch = useDispatch();
    const location = useLocation(); 

    function handleClick(e){
        e.preventDefault(); 
        dispatch(getRecipeDetail(props.id))
    }

    return (
        <div className='recipesCard'>
            <div> 
                <h1 className='titleRecipe'>{props.title}</h1>

                <h1 className='summaryRecipe'>{props.summary}</h1>
                
                <div> 
                    <h1 className='healthScoreRecipe'>{props.healthScore}</h1> 
                </div> 
                <div> 
                    <h4 className='dietsRecipe'>{props.diets}</h4> 
                </div> 
                <div> 
                    <h1 className='instructionsRecipe'>{props.instructions}</h1> 
                </div> 
               <div > 
                    <img className='imageRecipe' src={props.image} alt='Imagen no disponible'/> </div>          
                </div>

                <div>{ location.pathname.includes('/home') ? '🍴' : false }</div>

                <div>{ location.pathname.includes('/home') ? <button className='detailbutton' onClick={(e) => handleClick(e)}><Link to='/details'>Details</Link></button> : '🏠' } 
            </div>
               
        </div>
    )
}