export const addProfile = inputProfile => {
  return {
    type: 'ADD_PROFILE',
    payload: inputProfile
  }
}
export const editProfile = inputProfile => {
  return {
    type: 'EDIT_PROFILE',
    payload: inputProfile
  }
}