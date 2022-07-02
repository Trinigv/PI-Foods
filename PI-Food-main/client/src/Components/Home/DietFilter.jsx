import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, getBackendDiets} from '../../Redux/actions';



export default function DietFilter () {
const dispatch = useDispatch()
const diets = useSelector(state => state.totalDiets) 

const [input, setNewInput] = React.useState()



 function handleSelect(e) {
    e.preventDefault();
    setNewInput(e.target.value)
}

 function handleSubmit (e) {
    e.preventDefault();
    dispatch(filterByDiet(input))
    console.log(input)
 }
    
 useEffect(() => { //me sirve para agregar otras funcionalidades al componente
        dispatch(getBackendDiets())
    }, [dispatch] )

  /*useEffect(() => {
        dispatch(getBackendRecipes())
    },[dispatch])*/
    
    return (
        <div>
        <select onChange={e => handleSelect(e)}> { diets.length && diets.map(d => <option key={d.id}>{d.name}</option>)} </select>  
        <button onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
   
}

//Que quiero hacer:
//Tengo todas las dietas en mi select - option JOYA
//El reducer me va a traer las dietas filtradas
//Entonces cuando haga click en el search me tienen que llegar las recetas que ya filtre 
//el handle select tiene q almacenar la dieta que yo seleccione 
//para eso uso un useState 
