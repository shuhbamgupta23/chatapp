import { combineReducers } from 'redux';
import contact from './contact'
import user from './user'

export default combineReducers({
    contact,
    user
})