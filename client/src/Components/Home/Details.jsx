import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeDetail, deleteState } from '../../Redux/actions';
import './Details.css';

export default function Details(props) {
	const dispatch = useDispatch();
	const recipeDetails = useSelector((state) => state.recipeDetail);
	const id = props.match.params.id;
	console.log(recipeDetails);

	useEffect(() => {
		dispatch(getRecipeDetail(id));
		return dispatch(deleteState());
	}, [dispatch, id]); //lo hace solo cuando se renderiza (componentDidMount)

	return (
		<div>
			<div className='box'>
				<div className='boxnav'>
					<div className='subtitle'>
						<p>Recipe Detail</p>
					</div>
					<Link to='/home'>
						<button className='home'>Home</button>
					</Link>
				</div>
				<p className='titleRecipe'>{recipeDetails.title}</p>
				<div className='contdiv'>
					<img
						className='imageDetail'
						src={recipeDetails.image}
						alt='Imagen no disponible'
					/>
					<p className='summaryRecipe'>
						{recipeDetails.summary?.replace(/<[^>]*>?/gm, '')}
					</p>
				</div>

				<div className='contdivhealth'>
					<p className='dietsRecipe'>
						{recipeDetails.diets &&
							recipeDetails.diets.map((d) => d + ', ')}
					</p>
					<p className='healthscore'>
						Health Score: {recipeDetails.healthScore}
					</p>
				</div>

				<div>
					<div>
						<p className='instruct'>Instructions</p>
					</div>
					<p className='typeDiet'>
						{recipeDetails.Diets &&
							recipeDetails.Diets.map((o) => o.name + ', ')}
					</p>
				</div>
				<div>
					<p className='instructionsRecipe'>
						{recipeDetails.instructions}
					</p>
				</div>
				<div>
					{' '}
					<p>{recipeDetails.dishTypes}</p>
				</div>
			</div>
		</div>
	);
}
