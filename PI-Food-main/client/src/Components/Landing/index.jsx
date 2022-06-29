import React from 'react';
import {Link} from 'react-router-dom';

export default function Landing() {
    return (
        <div>
            <h3>Welcome to The Recipes Web Page</h3>
            <Link to='/home'> <button>Get Started</button> </Link>
        </div>
    )
}