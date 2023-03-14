import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBackendDiets, postRecipe } from '../../Redux/actions';
import './creation.css';
import video from '../videos/Pasta2.mp4';
import { Link } from 'react-router-dom';

export default function Create() {
	const dispatch = useDispatch();
	const diets = useSelector((state) => state.totalDiets);

	useEffect(() => {
		dispatch(getBackendDiets());
	}, [dispatch]);

	const [newRecipe, setNewRecipe] = useState({
		title: '',
		summary: '',
		healthScore: '',
		instructions: '',
		image: '',
		diets: [],
	});

	const [errors, setErrors] = useState({});

	const handleInputEvent = (event) => {
		event.preventDefault();
		setNewRecipe({
			...newRecipe,
			[event.target.name]: event.target.value,
		});

		setErrors(
			validate({
				...newRecipe,
				[event.target.name]: event.target.value,
			})
		);

		console.log(errors);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (Object.values(errors).length > 0) {
			alert('Complete information correctly');
		} else if (newRecipe.title === '' && newRecipe.summary === '') {
			alert('Recipe must have title and summary');
		} else {
			dispatch(postRecipe(newRecipe));
			alert('recipe created!');
			setNewRecipe({
				title: '',
				summary: '',
				healthScore: '',
				instructions: '',
				image: '',
				diets: [],
			});
		}
	};

	const handleSelect = (event) => {
		if (!newRecipe.diets.includes(event.target.value)) {
			setNewRecipe({
				...newRecipe,
				diets: newRecipe.diets.concat(event.target.value), //almacena lo seleccionado
			});
		} else {
			alert('You cant add the same diet twice');
		}
	};

	const handleDelete = (e) => {
		e.preventDefault();
		setNewRecipe({
			...newRecipe,
			diets: newRecipe.diets.filter((d) => d !== e.target.value),
		});
	};
	return (
		<div>
			<button className='buttonhome'>
				<Link to='/home'>Home</Link>
			</button>
			<div id='createrecipe'>
				<h2 className='new'>Create a Recipe: </h2>
			</div>
			<div className='f'>
				<form id='createform' onSubmit={(event) => handleSubmit(event)}>
					<label id='lab'>Title</label>
					<div className='title'>
						<input
							id='create'
							type='text'
							name='title'
							value={newRecipe.title}
							onChange={(event) => handleInputEvent(event)}
							className={errors.title}
						/>
						{errors.title ? (
							<p>
								{' '}
								<small>{errors.title}</small>
							</p>
						) : (
							false
						)}
					</div>
					<div className='summary'>
						<label id='lab'>Summary</label>
						<input
							id='create'
							type='text'
							name='summary'
							value={newRecipe.summary}
							onChange={(event) => handleInputEvent(event)}
							className={errors.summary}
						/>
						{errors.summary ? (
							<p>
								{' '}
								<small>{errors.summary}</small>
							</p>
						) : (
							false
						)}
					</div>
					<div>
						<label id='lab'>HealthScore</label>
						<input
							id='create'
							type='number'
							name='healthScore'
							value={newRecipe.healthScore}
							onChange={(event) => handleInputEvent(event)}
							className={errors.healthScore}
						/>
						{errors.healthScore ? (
							<p>
								{' '}
								<small>{errors.healthScore}</small>
							</p>
						) : (
							false
						)}
					</div>
					<div className='intscreate'>
						<label id='lab'>Instructions</label>
						<input
							id='create'
							type='text'
							name='instructions'
							value={newRecipe.instructions}
							onChange={(event) => handleInputEvent(event)}
						/>
					</div>
					<div className='imagecreate'>
						<label id='lab'>Image</label>
						<input
							id='create'
							type='text'
							name='image'
							value={newRecipe.image}
							onChange={(event) => handleInputEvent(event)}
						/>
						{errors.image ? (
							<p>
								<small>{errors.image}</small>
							</p>
						) : (
							false
						)}
					</div>

					<label id='lab'>Select diets:</label>
					<div className='dietscreate'>
						<select
							id='newlab'
							onChange={(event) => handleSelect(event)}>
							{diets.map((d) => (
								<option
									onClick={(event) => handleSelect(event)}
									key={d.id}
									value={d.name}>
									{d.name}
								</option>
							))}
						</select>
						<ul>
							{newRecipe.diets?.map((el) => (
								<li>
									{el}{' '}
									<button
										value={el}
										onClick={(e) => handleDelete(e)}>
										X
									</button>
								</li>
							))}
						</ul>
					</div>

					<input
						className='buttoncreate'
						type='submit'
						name='Submit'
					/>
				</form>
			</div>
		</div>
	);
}

//validating input function
export function validate(newRecipe) {
	let error = {};
	if (!newRecipe.title) {
		error.title = 'Recipe name can not be empty';
	}
	if (
		!/(?!^\s+$)^.*$/m.test(newRecipe.title) ||
		!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
			newRecipe.title
		)
	) {
		error.title =
			'Recipe must start with letter and cant contain special caracters';
	}
	if (!newRecipe.summary) {
		error.summary = 'Recipe summary can not be empty';
	}
	if (!newRecipe.healthScore) {
		error.healthScore = 'Recipe must have healthscore';
	}
	if (
		newRecipe.healthScore > 100 ||
		newRecipe.healthScore < 0 ||
		newRecipe.healthScore.includes('e') ||
		newRecipe.healthScore.includes(',') ||
		newRecipe.healthScore.includes('.')
	) {
		error.healthScore =
			'Healthscore must be an integer lower than 100 and higher than 0';
	}
	if (
		!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
			newRecipe.image
		)
	) {
		error.image = 'Image must be a valid URL';
	}
	return error;
}
