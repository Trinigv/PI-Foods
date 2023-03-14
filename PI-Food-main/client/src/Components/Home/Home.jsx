import React, { useEffect, useState } from 'react';
import SingleRecipe from './SingleRecipe';
import { useDispatch, useSelector } from 'react-redux';
import {
	getBackendRecipes,
	sortAlphabetically,
	sortByHealthscore,
} from '../../Redux/actions';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import DietFilter from './DietFilter';
import Pagination from './Pagination';
import './Home.css';

let prevId = 1;

export default function Cards() {
	const dispatch = useDispatch();
	const recipesState = useSelector((state) => state.totalRecipes);
	console.log(recipesState);

	const [page, setPage] = useState(1);
	const [recipesPage, setRecipesPage] = useState(9);
	const [order, setOrder] = useState('');

	const quantity = page * recipesPage;
	const firstRecipePage = quantity - recipesPage;
	var showRecipesPage;
	showRecipesPage = recipesState.slice(firstRecipePage, quantity);

	if (typeof showRecipesPage === 'string') {
		//When searching for name of unexisting recipe
		showRecipesPage = 'Could not find recipes ❌';
	}

	if (showRecipesPage.length === 0) {
		//when searching for a diet that is not included
		showRecipesPage = 'Could not find recipes';
	}

	const paged = function (pageNumber) {
		setPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getBackendRecipes());
	}, [dispatch]);

	function handleEvent(e) {
		e.preventDefault();
		dispatch(sortByHealthscore(e.target.value));
		setPage(1);
	}

	function handleEventAlphabet(e) {
		e.preventDefault();
		dispatch(sortAlphabetically(e.target.value));
		setPage(1);
		setOrder(`Order ${e.target.value}`);
	}

	function handleClick(e) {
		e.preventDefault();
		dispatch(getBackendRecipes());
		setPage(1);
		setOrder(`Order ${e.target.value}`);
	}

	return (
		<div className='all'>
			<div className='navbar'>
				<div className='searchHome'>
					<div className='filters'>
						<SearchBar setPage={setPage}> </SearchBar>{' '}
						<DietFilter setPage={setPage}></DietFilter>
					</div>
				</div>
				<div className='buttons'>
					<button
						className='b'
						value='MaxtoMin'
						onClick={(e) => handleEvent(e)}>
						From Max to Min
					</button>
					<button
						className='b'
						value='MinToMax'
						onClick={(e) => handleEvent(e)}>
						From Min to Max
					</button>
					<button
						className='b'
						value='AZ'
						onClick={(e) => handleEventAlphabet(e)}>
						Sort from A to Z{' '}
					</button>
					<button
						className='b'
						value='ZA'
						onClick={(e) => handleEventAlphabet(e)}>
						Sort from Z to A
					</button>
					<Link to='/create'>
						{' '}
						<button className='create' id='c'>
							Create recipe
						</button>{' '}
					</Link>{' '}
					<div id='c'>
						<button className='refresh' onClick={handleClick}>
							Delete filters
						</button>
					</div>
				</div>
				<div className='morebut'></div>
			</div>
			<div className='paginationBack'>
				<Pagination
					recipesPage={recipesPage}
					recipesState={recipesState.length}
					paged={paged}
				/>
			</div>
			<div className='cards'>
				{typeof showRecipesPage === 'object' ? (
					showRecipesPage?.map((recipe) => (
						<div>
							{' '}
							<Link to={`/detail/${recipe.id}`}>
								{' '}
								<SingleRecipe
									key={prevId++}
									image={recipe.image}
									title={recipe.title}
									diets={recipe.diets?.map((d) => d + ' 🥑 ')}
									Diets={recipe.Diets?.map((o) => o)}
									id={recipe.id}
								/>
							</Link>
						</div>
					))
				) : (
					<h2>{showRecipesPage}</h2>
				)}
			</div>
		</div>
	);
}
