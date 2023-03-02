import * as api from "../api/index";

export const sendMessage = (form) => async (dispatch) => {
  try {
    const { data } = await api.sendMessage(form);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const getMessage = (form) => async (dispatch) => {
  
  try {
    const { data } = await api.getMessage(form);
    console.log(data, "getMessage");
    dispatch({ type: "getMessage", payload: data });
  } catch (e) {
    console.log(e);
  }
};
