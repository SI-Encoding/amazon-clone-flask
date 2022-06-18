export const initialState = {
    user: null,
    selectedProduct: ""
}

const set_user = 'SET_USER'
const set_selected_product = 'SET_SELECTED_PRODUCT'
const set_total_items = 'SET_TOTAL_ITEMS'
const set_products = 'SET_PRODUCTS'
const set_product_counter = 'SET_PRODUCT_COUNTER'

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
        case 'SET_TOTAL_ITEMS':
            return {
                ...state,
                total_items:action.total_items
            }
        case 'SET_PRODUCTS':
            return {
                ...state,
                products:action.products
            }
        case 'SET_PRODUCT_COUNTER':
            return {
                ...state,
                product_counter:action.product_counter
            }
        default:
            return state;
    }
}

export {set_user, set_selected_product, set_total_items, set_products, set_product_counter}

export default rootReducer;
