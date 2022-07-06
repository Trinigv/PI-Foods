import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail } from '../../Redux/actions';

export default function Details(props) {
    const dispatch = useDispatch();
    const recipeDetails = useSelector(state => state.recipeDetail)
    const id = props.match.params.id;
    console.log(recipeDetails)
    
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]) //lo hace solo cuando se renderiza (componentDidMount)

    return (
        <div>
            <div> 
                <h1 className='titleRecipe'>{recipeDetails.title}</h1>

                <h1 className='summaryRecipe'>{recipeDetails.summary?.replace(/<[^>]*>?/gm, "")}</h1>

                <div>
                    <h1 className='healthScoreRecipe'>{recipeDetails.healthScore}</h1>
                </div>

                <div>
                    <h4 className='dietsRecipe'>{recipeDetails.diets && recipeDetails.diets.map(d => d + ' ')}</h4>
                </div>
                <div>
                    <h2 className='typeDiet'>{ recipeDetails.Diets && recipeDetails.Diets.map(o => o.name + ' ')}</h2>
                </div>
                <div>
                    <h1 className='instructionsRecipe'>{recipeDetails.instructions}</h1>
                </div>

                <div>
                    <img className='imageRecipe' src={recipeDetails.image} alt='Imagen no disponible' />
                </div>

            </div>

            <Link to='/home'><button>Home</button></Link>
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