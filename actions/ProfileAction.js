import axios from 'axios'
export const ADD_PROFILE = 'ADD_PROFILE'
export const SET_FORM_STATUS = 'SET_FORM_STATUS'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const START_ADD_PROFILE = 'START_ADD_PROFILE'
export const FINISH_ADD_PROFILE = 'FINISH_ADD_PROFILE'
export const RESET_PROCESS = 'RESET_PROCESS'
const URI = 'https://29b37812.ngrok.io/job_seekers'
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
export const setStatusForm = status => {
  return {
    type: SET_FORM_STATUS,
    status
  }
}
export const startAddProfile = () => {
  return {
    type: START_ADD_PROFILE
  }
}
export const finishAddProfile = () => {
  return {
    type: FINISH_ADD_PROFILE
  }
}
export const resetProcess = () => {
  return {
    type: RESET_PROCESS
  }
}

export const addProfileAPI = (inputProfile) => {
  return (dispatch, getState) => {
    dispatch(startAddProfile())
    axios.post(URI, inputProfile)
    .then(({data}) => {
      dispatch(addProfile(data))
      dispatch(finishAddProfile())
    })
  }
}
export const editProfileAPI = (inputProfile, id) => {
  return (dispatch, getState) => {
    axios.post(URI+'/'+id, inputProfile)
    .then(({data}) => {
      dispatch(editProfile(data))
    })
  }
}