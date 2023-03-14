import React from 'react';
import { useState } from 'react';
import { getRecipesByName } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css';

export default function SearchBar({ setPage }) {
	const dispatch = useDispatch(); //to use dispatch
	const [name, setName] = useState(); // use state in functional component (hooks)

	const recipeName = useSelector((state) => state.totalRecipes);

	function handleChange(e) {
		e.preventDefault();
		setName(e.target.value); // tiene q ser e.target.value si o si
	}

	function handleSubmit(e) {
		e.preventDefault(); //prevents browser default behavior
		dispatch(getRecipesByName(name)); //calls action with the component's state
		setPage(1);
	}

	return (
		<form>
			<div className='search'>
				<input
					className='inputsearch'
					type='text'
					placeholder='Search...'
					onChange={(e) => handleChange(e)}
				/>
				<button
					type='submit'
					className='buttonsearch'
					onClick={(e) => handleSubmit(e)}>
					Search
				</button>
				<input className='res' type='reset' value='Reset'></input>
			</div>
		</form>
	);
}
