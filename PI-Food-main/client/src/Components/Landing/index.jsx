import React from 'react';
import {Link} from 'react-router-dom';
import './index.css'
import video from '../Css modules/videos/fruits2.mp4'

export default function Landing() {
    return (
        <div>
            <video autoPlay muted loop> <source src={video}/> </video>
            <h3>Welcome to The Recipes Web Page</h3>
            <Link to='/home' id='start'> <button className='starting'>Get Started</button></Link>
        </div>
    )
}