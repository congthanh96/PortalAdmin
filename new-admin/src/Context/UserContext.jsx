import React, {createContext, useReducer} from "react"

const UserContext = createContext({});
const UpdateUserContext = createContext(null);

const defaultUserContext = {
    isLoading: true,
    userName: ""    
}

const userReducer = (state, action) =>
{
    switch (action.type) {
        case "LOGIN_SET": {
            return{
                ...state,
                userName: action.username,
                isLoading: false
            }
        }

        default: throw new Error();
    }
}


const UserProvider = ({children}) =>
{
    const [profile, dispatchProfile] = useReducer(userReducer, defaultUserContext);

    const updateProfile = (action) =>
    {
        dispatchProfile(action)
    }

    return(
        <UserContext.Provider value={profile}>
            <UpdateUserContext.Provider value={updateProfile}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider

export {
    UserContext,
    UpdateUserContext,
}