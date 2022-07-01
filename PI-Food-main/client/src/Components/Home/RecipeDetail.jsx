import React from 'react'; 
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SingleRecipe from './SingleRecipe';



export default function Details () {
    const recipeDetails = useSelector(state => state.recipeDetail)
    console.log(recipeDetails)

    return (
        <div>
                {recipeDetails.length > 0 && recipeDetails.map( r => 
                   <SingleRecipe 
                   title = {r.title} 
                   image={r.image}
                   summary={r.summary}
                   healthScore={r.healthScore}
                   instructions={r.instructions} />
                )}

            <Link to='/home'><button>Home</button></Link>
        </div>
       
    )
}