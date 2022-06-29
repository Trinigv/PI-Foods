import React from 'react'; 
import { useState } from 'react'; 
import { getRecipesByName } from '../../Redux/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar() {
    const dispatch = useDispatch(); //to use dispatch
    const [name, setName] = useState(''); // use state in functional component (hooks)

    function handleChange(e){
        e.preventDefault(); 
        setName(e.target.value) // tiene q ser e.target.value si o si 
    }

    function handleSubmit(e){
        e.preventDefault(); //prevents browser default behavior
        dispatch(getRecipesByName(name)) //calls action with the component's state
    }

    return (
        <div>
        <input type='text' placeholder='Search...' onChange= { e => handleChange(e) }/>
        <button type='submit' onClick={ e => handleSubmit(e)}>Search</button>
        </div>

    )
}