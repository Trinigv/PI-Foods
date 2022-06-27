import axios from 'axios'; 
export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';

export const getBackendRecipes = () => {
   return async function ask(dispatch) {
    let info = await axios.get('http://localhost:3001/recipes/')
    return dispatch({
        type: GET_RECIPES,
        payload: info.data 
    })
   }
}

export const getBackendDiets = (dispatch) => {
    return async (dispatch) => {
        let dietTypes = await axios.get('http://localhost:3001/diets/')
        return dispatch({
            type: GET_DIETS,
            payload: dietTypes.data
        })
    }
}

