import { GET_RECIPES, GET_DIETS, GET_RECIPE_DETAIL, CREATE_RECIPE } from './actions'

const initialState = {
    totalRecipes: [],
    totalDiets: [],
}

export default function rootReducer(state=initialState, action) {

    switch(action.type){
        case GET_RECIPES: 
            return {
                ...state, 
                totalRecipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                totalDiets: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                totalRecipes: action.payload
            }
        case CREATE_RECIPE: 
            return {
                ...state
            }

        default: return state
    }

}
