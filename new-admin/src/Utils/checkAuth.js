const checkAuth = () => {
  const isAuth = !!localStorage.getItem("tokenADMIN");
  return isAuth;
};
export default checkAuth;
