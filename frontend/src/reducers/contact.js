// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { contactData: null }, action) => {
  switch (action.type) {
    case "getMessage":
      localStorage.setItem("currentUserMessageLog", JSON.stringify({ ...action?.payload }));
      return { ...state, contactData: action.payload };
    case 'currentUser'  :
      localStorage.setItem("currentUser", JSON.stringify({ ...action?.payload}));
      return state;
    default:
      return state;
  }
};
