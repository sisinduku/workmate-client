import {
  ADD_PROFILE,
  GET_PROFILE,
  EDIT_PROFILE,
  SET_FORM_STATUS,
  START_ADD_PROFILE,
  FINISH_ADD_PROFILE,
  RESET_PROCESS
} from '../actions/ProfileAction'
import { combineReducers } from 'redux'
const profileState = {
  inputProfile: {
    name: '',
    location: '',
    educations: '',
    skills: '',
    executive_summary: '',
    personality_insight: '',
    password: 'abc'
  },
  id: '',
  process: false,
  statusForm: false,
  message: '',
  isDone: false,
}
const ProfileReduce = (state = profileState, action) => {
  switch(action.type) {
    case ADD_PROFILE:
      return {...state, inputProfile: action.responseProfile, id: action.responseProfile._id }
    case GET_PROFILE:
      return {...state, inputProfile: action.dataProfile, id: action.dataProfile._id }
    case EDIT_PROFILE:
      return {...state, inputProfile: action.inputProfile }
    case SET_FORM_STATUS:
      return {...state, statusForm: action.status}
    case START_ADD_PROFILE:
      return {...state, process: true}
    case FINISH_ADD_PROFILE:
      return {...state, process: false, isDone: true}
    case RESET_PROCESS:
      return {...state, process: false, isDone: false}
    default:
      return state
  }
}
const Profile = combineReducers({ ProfileReduce })
export default Profile
