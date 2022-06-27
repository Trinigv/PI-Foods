import React from 'react'; 

//destructuring of components
export default function SingleRecipe(props) {

    return (
        <div>
            <div>
               <div> 
                    <h1>{props.title}</h1> 
                </div> 
                <div> 
                    <h1>{props.summary}</h1> 
                </div> 
                <div> 
                    <h1>{props.healthScore}</h1> 
                </div> 
                <div> 
                    <h1>{props.diets}</h1> 
                </div> 
                <div> 
                    <h1>{props.instructions}</h1> 
                </div> 
               <div> 
                    <img src={props.image} alt='Imagen no disponible'/> </div>         
                </div>
        </div>
    )
}