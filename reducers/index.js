import { combineReducers } from 'redux';

import ProfileReduce from './ProfileReduce';
import EmployerReducer from './EmployerReducer';

export default combineReducers({
  ProfileReduce,
  EmployerReducer
});
