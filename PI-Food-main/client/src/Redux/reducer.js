import { GET_RECIPES, GET_DIETS, GET_RECIPE_DETAIL, CREATE_RECIPE, FILTER_BY_DIET, SORT_HEALTHSCORE, ALPHABET } from './actions'

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
        case SORT_HEALTHSCORE: 
            let sorted = [...state.recipes]
            sorted = action.payload === 'MinToMax' ?
            sorted.sort(function(a,b) {
                return a.healthScore - b.healthScore
            }) : sorted.sort(function(a,b) {
                return b.healthScore - a.healthScore
            })
            return {
                ...state,
                totalRecipes: sorted
            }
        case ALPHABET:
            let sortAlphabet = [...state.recipes]
            sortAlphabet = action.payload === 'AZ' ?
            sortAlphabet.sort(function(a,b) {
                if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
                if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
                return 0
            }) : 
            sortAlphabet.sort(function(a,b) {
                if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
                if(a.title.toLowerCase() > b.title.toLowerCase()) return -1
                return 0 
            })
            return {
                ...state,
                totalRecipes: sortAlphabet
            }

    


        default: return state
    }

}
