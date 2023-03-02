// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { userData: null }, action) => {
  switch (action.type) {
    case "signIn":
      localStorage.setItem("userData", JSON.stringify({ ...action?.payload }));
      return { ...state, userData: action.payload };

    case "signUp":
      localStorage.setItem("userData", JSON.stringify({ ...action?.payload }));
      return { ...state, userData: action.payload };

    case "signOut":
      localStorage.clear();
      return { ...state, userData: null };
    case "allUser":
      localStorage.setItem("allContacts",JSON.stringify({ ...action?.payload })
      );
      return state;

    default:
      return state;
  }
};
