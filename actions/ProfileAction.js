export const ADD_PROFILE = 'ADD_PROFILE'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const addProfile = inputProfile => {
  return {
    type: ADD_PROFILE,
    inputProfile
  }
}
export const editProfile = inputProfile => {
  return {
    type: EDIT_PROFILE,
    inputProfile
  }
}