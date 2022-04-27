import { GET_ORDERS, ORDERS_LOADING, GET_ORDERS_FAILURE } from "../../Common/constants"
import { ordersAPI } from "../../APIs"

export const actGetOrders = () => {
    return async (dispatch) => {
        //const tokenUser = getState().authReducer.user;
        dispatch({
            type: ORDERS_LOADING
        })

        try {
            const response = await ordersAPI.getOrders()
            console.log(response)
            dispatch({
                type: GET_ORDERS,
                orders: response.bills,
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: GET_ORDERS_FAILURE,
            })
        }
    }
}