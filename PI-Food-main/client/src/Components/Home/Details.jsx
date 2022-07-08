import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail } from '../../Redux/actions';
import './Details.css'

export default function Details(props) {
    const dispatch = useDispatch();
    const recipeDetails = useSelector(state => state.recipeDetail)
    const id = props.match.params.id;
    console.log(recipeDetails)
    
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]) //lo hace solo cuando se renderiza (componentDidMount)
    console.log(props, props)
    return (
        <div id='back'>
            <div id='titleRecipe'> 
                <h1 >{recipeDetails.title}</h1>

                <h1 className='summaryRecipe'> Summary:{recipeDetails.summary?.replace(/<[^>]*>?/gm, "")}</h1>

                <div>
                    <h1 id='healthScoreRecipe'>{recipeDetails.healthScore}</h1>
                </div>

                <div>
                    <h4 className='dietsRecipe'>Diets: {recipeDetails.diets && recipeDetails.diets.map(d => d + ' ')}</h4>
                </div>
                <div>
                    <h4 className='dietsRecipe'>Dishtypes: {recipeDetails.dishTypes + ''}</h4>
                </div>
                <div>
                    <h2 className='typeDiet'>Details:{ recipeDetails.Diets && recipeDetails.Diets.map(o => o.name + ' ')}</h2>
                </div>
                <div>
                    <h3 id='instructions'>Instructions:{recipeDetails.instructions}</h3>
                </div>
                <div>
                    <img className='imageRecipe' src={recipeDetails.image} alt='Imagen no disponible' />
                </div>

            </div>

            <Link to='/home'><button className='b'>Home</button></Link>
        </div>

    )
}


/*recipeDetails.length > 0 && recipeDetails.map( r =>
    key={r.id}
   title = {r.title} 
   image={r.image}
   summary = {r.summary ? r.summary.replace(/<[^>]*>?/gm, "") : 'Summary not available'}
   diets = {r.diets?.map(d => d + ' ')}
   healthScore={r.healthScore}
   instructions={r.instructions}
)*/