import * as api from "../api/index";

export const sendMessage = (form) => async (dispatch) => {
  const { from, to } = form;
  try {
    const { data } = await api.sendMessage(form);
    dispatch(getMessage({ from, to }));
  } catch (e) {
    console.log(e);
  }
};

export const getMessage = (form) => async (dispatch) => {
  try {
    const { data } = await api.getMessage(form);
    dispatch({ type: "getMessage", payload: data });
  } catch (e) {
    console.log(e);
  }
};
