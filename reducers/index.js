import { combineReducers } from 'redux';

import ProfileReducer from './ProfileReducer';
import EmployerReducer from './EmployerReducer';

export default combineReducers({
  ProfileReducer,
  EmployerReducer
});