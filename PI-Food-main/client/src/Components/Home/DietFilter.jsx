import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, getBackendDiets } from '../../Redux/actions';
import { getBackendRecipes } from '../../Redux/actions';
import './DietFilter.css';



export default function DietFilter() {
    const dispatch = useDispatch()
    const diets = useSelector(state => state.totalDiets)

    const [input, setNewInput] = React.useState()

    function handleSelect(e) {
        e.preventDefault();
        setNewInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(input){
        dispatch(filterByDiet(input))}
    }

    console.log(input)


    useEffect(() => { //me sirve para agregar otras funcionalidades al componente
        dispatch(getBackendDiets())
    }, [dispatch])

    useEffect(() => {
        dispatch(getBackendRecipes())
    }, [dispatch])

    return (
        <div>
            <select onChange={e => handleSelect(e)}> <option selected="true" disabled="disabled">Choose Tagging</option> {diets.length && diets.map(d => <option key={d.id}>{d.name}</option>)} </select>
            <button className='selectDiet' onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )

}


