import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getBackendDiets } from '../../Redux/actions';



export default function FilterDiet () {
    const dispatch = useDispatch()
    const diets = useSelector(state => state.totalDiets) 
    
    useEffect(() => {
        dispatch(getBackendDiets())
    }, [dispatch] )
    
    return (
        <div>
        { diets.length && diets.map(d => <button>{d.name}</button>)}
        </div>
    )
   
}