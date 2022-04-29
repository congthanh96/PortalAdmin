import { GET_PRODUCTS, PRODUCTS_LOADING, GET_PRODUCTS_FAILURE } from "../../Common/constants"
import { productsAPI } from "../../APIs"

export const actGetProducts = () => {
    return async (dispatch) => {
        //const tokenUser = getState().authReducer.user;
        dispatch({
            type: PRODUCTS_LOADING
        })

        try {
            const response = await productsAPI.getProducts()
            console.log(response)
            dispatch({
                type: GET_PRODUCTS,
                products: response,
            })
        } catch (err) {
            dispatch({
                type: GET_PRODUCTS_FAILURE,
            })
        }
    }
}