export const initialState = {
    user: null,
    selectedProduct: ""
}

const set_user = 'SET_USER'
const set_selected_product = 'SET_SELECTED_PRODUCT'

const rootReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user:action.user,
            }
        case 'SET_SELECTED_PRODUCT':
            return {
                ...state,
                selectedProduct:action.selectedProduct,
            }
        default:
            return state;
    }
}

export {set_user, set_selected_product}

export default rootReducer;
