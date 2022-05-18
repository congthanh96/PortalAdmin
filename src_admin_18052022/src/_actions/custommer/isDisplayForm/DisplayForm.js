import *as type from './../../../_constants/ActionType';
export const toggleForm = () =>{
    return {
        type : type.TOGGLE_FORM,
    }
  }
  export const openForm = () =>{
    return {
        type : type.OPEN_FORM,
    }
  }
  export const closeForm = () =>{
    return {
        type : type.CLOSE_FORM,
    }
  }