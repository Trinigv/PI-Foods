import React from 'react';
import './SingleRecipe.css';

//destructuring of components

export default function SingleRecipe(props) {
	return (
		<div className='ext'>
			<div className='recipesCard'>
				{' '}
				<p className='titleRecipe'>{props.title}</p>
				<p className='summaryRecipe'>{props.summary}</p>
				<div>
					<p className='healthScoreRecipe'>{props.healthScore}</p>
				</div>
				<div>
					<p className='dietsRecipe'>{props.diets}</p>
				</div>
				<div>
					<p className='typeDiet'>
						{props.Diets === undefined
							? false
							: props.Diets?.map((o) => o.name)}
					</p>
				</div>
				<div>
					<p className='instructionsRecipe'>{props.instructions}</p>
				</div>
				<div id='recipeimg'>
					<img
						className='imageRecipe'
						src={props.image}
						alt='Imagen no disponible'
					/>
				</div>
			</div>
		</div>
	);
}
