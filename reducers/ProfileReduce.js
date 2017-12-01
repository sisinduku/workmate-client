import { 
  ADD_PROFILE,
  EDIT_PROFILE,
  SET_FORM_STATUS,
  START_ADD_PROFILE,
  FINISH_ADD_PROFILE,
  RESET_PROCESS
} from '../actions/ProfileAction'
import { combineReducers } from 'redux'
const profileState = {
  id: '', 
  process: false,
  statusForm: false,
  message: '',
  inputProfile: {
    name: '',
    location: '',
    education: '',
    skills: '',
    executive_summary: '',
    personality_insight: '',
    password: 'abc'
  },
}
const ProfileReduce = (state = profileState, action) => {
  switch(action.type) {
    case ADD_PROFILE:
      return {...state, inputProfile: action.profileInput }
    case EDIT_PROFILE:
      return {...state, inputProfile: action.profileInput }
    case SET_FORM_STATUS:
      return {...state, statusForm: action.status}
    case START_ADD_PROFILE:
      return {...state, process: false}
    case FINISH_ADD_PROFILE:
      return {...state, process: true}
    case RESET_PROCESS:
      return {...state, process: false}
    default:
      return state
  }
}
const Profile = combineReducers({ ProfileReduce })
export default Profile