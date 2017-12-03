const defaultState = {
  id: '', 
  profile: {
    name: '',
    location: '',
    education: '',
    skills: '',
    summary: ''
  }
}

const ProfileReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_PROFILE':
      return {...state, profile: action.payload }
    case 'EDIT_PROFILE':
      return {...state, profile: action.payload }
    default:
      return state
  }
}

export default ProfileReducer;