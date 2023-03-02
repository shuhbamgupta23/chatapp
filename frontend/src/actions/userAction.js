import * as api from "../api/index";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "signIn", payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "signUp", payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUser();
    dispatch({ type: "allUser", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const searchFriend = (name) => async (dispatch) => {
  try {
    const { data } = await api.getFriend(name);
    if (data?.result != null) {
      dispatch({ type: "allUser", payload: data });
    }
    console.log(data, "friend");
  } catch (error) {
    console.log(error);
  }
};
