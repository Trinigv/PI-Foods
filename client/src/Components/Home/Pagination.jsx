import React from 'react';
import './Pagination.css';

export default function Pagination({ recipesPage, recipesState, paged }) {
	const pages = [];

	for (let i = 1; i <= Math.ceil(recipesState / recipesPage); i++) {
		pages.push(i);
	}

	return (
		<div>
			{pages.length <= 1 ? (
				<></>
			) : (
				<nav className='nav'>
					<ul>
						{pages?.map((p) => (
							<li key={p}>
								<button
									className='numberpages'
									onClick={() => paged(p)}>
									{p}
								</button>
							</li>
						))}
					</ul>
				</nav>
			)}
		</div>
	);
}
