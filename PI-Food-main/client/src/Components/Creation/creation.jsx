import React from 'react'; 
import { useEffect } from 'react';
import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getBackendDiets, postRecipe } from '../../Redux/actions';

export default function Create() {

const dispatch = useDispatch(); 
const diets = useSelector((state) => state.totalDiets)

useEffect(()=> {
    dispatch(getBackendDiets())
}, [dispatch])

const [newRecipe, setNewRecipe] = useState({
    title: '',
    summary: '',
    healthScore: '', 
    instructions: '',
    image: '',
    diets: []
}); 

const [errors, setErrors] = useState({})

const handleInputEvent = (event) => {
    event.preventDefault()
    setNewRecipe({
        ...newRecipe,
        [event.target.name]: event.target.value 
    });
    
    setErrors(validate({
        ...newRecipe,
        [event.target.name]: event.target.value
    }));

    console.log(errors)
}

const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).length > 0){
        alert('Complete information correctly')
    } else if (newRecipe.title === '' && newRecipe.summary === '' ) {
        alert('Recipe must have title and summary')
    } else {
        dispatch(postRecipe(newRecipe));
        alert('recipe created!');
        setNewRecipe({
            title: ' ', //arreglar esto
            summary: '',
            healthScore: '', 
            instructions: '',
            image: '',
            diets: []
        });
    }
}

const handleSelect = (event) => {
    setNewRecipe({
        ...newRecipe,
        diets: [...newRecipe.diets, event.target.value] //almacena lo seleccionado
    })
}
    return (
        <div>
                <h2>Your new Recipe: </h2>
            <form onSubmit = {(event) => handleSubmit(event)}>

                <label>Title</label>
                <input type='text' name='title' value={newRecipe.title} 
                onChange={(event) => handleInputEvent(event)}
                className={errors.title && 'danger'}/>
                {errors.title ? <p> <small>{errors.title}</small></p> : false}

                <label>Summary</label>
                <input type='text' name='summary' value={newRecipe.summary} 
                onChange={(event) => handleInputEvent(event)}
                className={errors.summary}/>
                {errors.summary ? <p> <small>{errors.summary}</small></p> : false}

                <label>HealthScore</label>
                <input type='number' name='healthScore' value={newRecipe.healthScore} 
                onChange={(event) => handleInputEvent(event)}
                className = {errors.healthScore}/>
                {errors.healthScore ? <p> <small>{errors.healthScore}</small></p> : false}

                <label>Instructions</label>
                <input type='text' name='instructions' value={newRecipe.instructions} onChange={ (event) => handleInputEvent(event)}/>

                <label>Image</label>
                <input type='text' name='image' value={newRecipe.image} onChange={ (event) => handleInputEvent(event)}/>
                {errors.image ? <p><small>{errors.image}</small></p> : false}

                <div> 
                    <label>Select diets:</label>
                    <select onChange={(event) => {handleSelect(event)}}>
                        {diets.map((d) => <option key={d.id} value={d.name}>{d.name}</option>) // falta key
                        } 
                    </select>
                    <ul><li>{newRecipe.diets}</li></ul>
                </div>

                <input type='submit' name='Submit' />

            </form>
        </div>
    )
}

//validating input function
export function validate(newRecipe) {
    let error = {}; 
    if(!newRecipe.title) {
        error.title = 'Recipe name can not be empty'
    }
    if(!/[a-zA-Z]/.test(newRecipe.title)){
        error.title='Recipe name must contain letters'
    }
    if(!newRecipe.summary) {
        error.summary = 'Recipe summary can not be empty'
    }
    if(newRecipe.healthScore > 100 || newRecipe.healthScore < 0) {
        error.healthScore = 'Healthscore must be lower than 100 and higher than 0'
    }
    if(!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(newRecipe.image)){
        error.image = 'Image must be a valid URL'
    }
    return error; 
}