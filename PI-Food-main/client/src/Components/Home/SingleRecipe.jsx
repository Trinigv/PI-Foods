import React from 'react'; 
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeDetail } from '../../Redux/actions';
//destructuring of components

export default function SingleRecipe(props) {

    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault(); 
        dispatch(getRecipeDetail(props.id))
    }

    return (
        <div>
            <div> 
                <h1>{props.title}</h1>
                <div> 
                    <h1>{props.summary}</h1> 
                </div> 
                <div> 
                    <h1>{props.healthScore}</h1> 
                </div> 
                <div> 
                    <h4>{props.diets}</h4> 
                </div> 
                <div> 
                    <h1>{props.instructions}</h1> 
                </div> 
               <div> 
                    <img src={props.image} alt='Imagen no disponible'/> </div>          
                </div>

                <div><h3>{props.id}</h3></div>
                <button onClick={(e) => handleClick(e)}><Link to='/details'>Details</Link></button>
               
        </div>
    )
}