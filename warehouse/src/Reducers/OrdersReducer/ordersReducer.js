import { ORDERS_LOADING, GET_ORDERS, GET_ORDERS_FAILURE } from "../../Common/constants"
const initialState = {
    orders: [],
    isLoading: false
}

export default function ordersReducer (state = initialState, action) {
    console.log(action.type)
    console.log(action.orders)
    switch (action.type) {
        case ORDERS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        case GET_ORDERS:
            return {
                ...state,
                orders: [...action.orders],
                isLoading: false
            }
        default:
            return state
    }
}