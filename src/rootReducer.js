export const initialState = {
    user: null,
    selectedProduct: "",
    total_items: 0,
    products:{},
    product_counter:{},
    total_cost: 0,
    popup: true
}

const set_user = 'SET_USER'
const set_selected_product = 'SET_SELECTED_PRODUCT'
const set_total_items = 'SET_TOTAL_ITEMS'
const set_products = 'SET_PRODUCTS'
const set_product_counter = 'SET_PRODUCT_COUNTER'
const set_total_cost = 'SET_TOTAL_COST'
const set_popup = 'SET_POPUP'

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
        case 'SET_TOTAL_COST':
            return {
                ...state,
                total_cost:action.total_cost,
            }
        case 'SET_POPUP':
            return {
                ...state,
                popup:action.popup,
            }  
        default:
            return state;
    }
}

export {set_user, set_selected_product, set_total_items, set_products, set_product_counter, set_total_cost, set_popup}

export default rootReducer;
