import { GET_RECIPES, GET_DIETS, GET_RECIPE_DETAIL, CREATE_RECIPE, FILTER_BY_DIET } from './actions'

const initialState = {
    recipes: [], 
    totalRecipes: [], 
    totalDiets: [],
}


export default function rootReducer(state=initialState, action) {

    switch(action.type){
        case GET_RECIPES: 
            return {
                ...state, 
                totalRecipes: action.payload,
                recipes: action.payload
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
        case FILTER_BY_DIET:
            const recipes = state.recipes;
            const search  = recipes.filter(r => r.diets?.some(d => d === action.payload))
            return {
                ...state,
                totalRecipes: search
            }

        default: return state
    }

}
