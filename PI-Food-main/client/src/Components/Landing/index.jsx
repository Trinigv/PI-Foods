import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import backimg from '../videos/pump.jpeg';

export default function Landing() {
	return (
		<div className='backgroundland'>
			<img className='backimg' src={backimg} alt='back'></img>
			<div className='foodspi'>
				<h3>'Foods' Project</h3>
			</div>
			<div className='buttonstartdiv'>
				<Link to='/home' id='start'>
					<button className='starting'>Show me recipes!</button>
				</Link>
			</div>
		</div>
	);
}
