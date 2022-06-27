import { GET_RECIPES, GET_DIETS } from './actions'

const initialState = {
    totalRecipes: [],
    totalDiets: []
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

        default: return state
    }

}
