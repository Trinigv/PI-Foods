import { GET_RECIPES, GET_DIETS, RECIPE_DETAIL, CREATE_RECIPE, FILTER_BY_DIET, SORT_HEALTHSCORE, ALPHABET, GET_RECIPE_NAME} from './actions'

const initialState = {
    recipes: [], 
    totalRecipes: [], 
    totalDiets: [],
    recipeDetail: [],
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
        case GET_RECIPE_NAME:
            return{
                ...state,
                totalRecipes: action.payload,
                recipes: action.payload
            }
        case CREATE_RECIPE: 
            return {
                ...state
            }
        case FILTER_BY_DIET:
            const recipes = state.recipes; //? state.recipes o state.totalRecipes
            var search; 
            typeof recipes === 'object' ? search = recipes.filter(r => r.diets?.some(d => d === action.payload)) : search=[]; 
            return {
                ...state,
                totalRecipes: search,
            }
        case RECIPE_DETAIL: 
            return {
                ...state,
                recipeDetail: action.payload
            }
        case SORT_HEALTHSCORE: 
            let sorted = [...state.totalRecipes]
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
            let sortAlphabet = [...state.totalRecipes]
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
