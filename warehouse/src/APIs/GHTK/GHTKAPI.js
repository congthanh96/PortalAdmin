import axiosClient from '../axiosClient'
import { GET_GHTK_LIST_PICK_ADD } from '../../Common/constants'
export const GHTKAPI = {
    getListPickAdd: () => {
        return axiosClient.get(GET_GHTK_LIST_PICK_ADD)
    }
}
