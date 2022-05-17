/**
 * Actions của danh sách sản phẩm
 */
import { GET_PRODUCTS, PRODUCTS_LOADING, GET_PRODUCTS_FAILURE } from "../../Common/constants"
import { productsAPI } from "../../APIs"

// Lấy danh sách sản phẩm
export const actGetProducts = () => {
    return async (dispatch) => {
        dispatch({
            type: PRODUCTS_LOADING
        })

        try {
            const response = await productsAPI.getProducts()
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