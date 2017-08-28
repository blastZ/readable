import { SET_CATEGORIES } from '../actions/categories_action';

const initState = {
    categories: []
}

function categoriesReducer(state=initState, action) {
    const { categories } = action;
    switch (action.type) {
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: categories.categories
            }
        }
        default: return state;
    }
}

export default categoriesReducer;
