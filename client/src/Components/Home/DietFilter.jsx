import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, getBackendDiets } from '../../Redux/actions';
import './DietFilter.css';

export default function DietFilter({ setPage }) {
	const dispatch = useDispatch();
	const diets = useSelector((state) => state.totalDiets);

	const [input, setNewInput] = React.useState();

	function handleSelect(e) {
		e.preventDefault();
		setNewInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (input) {
			dispatch(filterByDiet(input));
		}
		setPage(1);
	}

	useEffect(() => {
		//me sirve para agregar otras funcionalidades al componente
		dispatch(getBackendDiets());
	}, [dispatch]);

	return (
		<div className='dietfilter'>
			<select id='filtdiets' onChange={(e) => handleSelect(e)}>
				{' '}
				<option value='none' selected disabled hidden>
					Select an Option
				</option>{' '}
				{diets.length &&
					diets.map((d) => <option key={d.id}>{d.name}</option>)}{' '}
			</select>
			<button className='selectDiet' onClick={(e) => handleSubmit(e)}>
				Search
			</button>
		</div>
	);
}
