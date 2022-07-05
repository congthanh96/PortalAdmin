import React, { createContext, useReducer } from "react";

const UserContext = createContext({});
const UpdateUserContext = createContext(null);

const defaultUserContext = {
  userName: localStorage.getItem("userName") || {},
  isLogin: localStorage.getItem("tokenADMIN") ? true : false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SET": {
      // console.log("vô đây");
      return {
        userName: action.userName,
        isLogin: action.isLogin,
      };
    }

    default:
      throw new Error();
  }
};

const UserProvider = ({ children }) => {
  const [profile, dispatchProfile] = useReducer(
    userReducer,
    defaultUserContext
  );

  const updateProfile = (action) => {
    dispatchProfile(action);
  };

  return (
    <UserContext.Provider value={profile}>
      <UpdateUserContext.Provider value={updateProfile}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;

export { UserContext, UpdateUserContext };
