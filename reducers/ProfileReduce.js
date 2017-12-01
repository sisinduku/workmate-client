import { 
  ADD_PROFILE,
  EDIT_PROFILE 
} from '../actions/ProfileAction'
import { combineReducers } from 'redux'
const profileState = {
  id: '', 
  inputProfile: {
    name: '',
    location: '',
    education: '',
    skills: '',
    summary: ''
  }
}
const ProfileReduce = (state = profileState, action) => {
  switch(action.type) {
    case ADD_PROFILE:
      return {...state, Profile: action.profileInput }
    case EDIT_PROFILE:
      return {...state, Profile: action.profileInput }
    default:
      return state
  }
}
const Profile = combineReducers({ ProfileReduce })
export default Profile