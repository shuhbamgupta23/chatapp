import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });


export const sendMessage = (messageData) => API.post("/chat/message", messageData)
export const getMessage = (form) => API.get(`/chat/message/:${form.from}/:${form.to}`)


export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const getAllUser = () => API.get('/users/allUsers')
export const getFriend = (name) => API.get(`/users/getFriend/${name}`)
