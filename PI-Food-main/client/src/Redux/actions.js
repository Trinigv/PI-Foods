import axios from 'axios'; 
export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL'; 
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'

export const getBackendRecipes = () => {
   return async function ask(dispatch) {
    let info = await axios.get('http://localhost:3001/recipes')
    return dispatch({
        type: GET_RECIPES,
        payload: info.data 
    })
 }
}
export const getBackendDiets = () => {
    return async (dispatch) => {
        let diets = await axios.get('http://localhost:3001/diets')
        return dispatch({
            type: GET_DIETS,
            payload: diets.data
        })
    }
}

export const getRecipesByName = (title) => {
    return async (dispatch) => {
        return fetch(`http://localhost:3001/recipes/?title=${title}`)
        .then(res => res.json())
        .then(detail => {dispatch( {type:GET_RECIPE_DETAIL, payload: detail} )})
    }
}

export const postRecipe = (payload) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:3001/recipes/create', payload)
        return {
            type: CREATE_RECIPE,
            res
        }
    }

}

export function filterByDiet (payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
};

