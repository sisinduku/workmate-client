import axios from 'axios'
import { AsyncStorage } from 'react-native'
export const ADD_PROFILE = 'ADD_PROFILE'
export const SET_FORM_STATUS = 'SET_FORM_STATUS'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const GET_PROFILE = 'GET_PROFILE'
export const START_ADD_PROFILE = 'START_ADD_PROFILE'
export const FINISH_ADD_PROFILE = 'FINISH_ADD_PROFILE'
export const RESET_PROCESS = 'RESET_PROCESS'
const URI = 'https://api-workmate.mepawz.com/job_seekers'

export const addProfile = responseProfile => {
  return {
    type: ADD_PROFILE,
    responseProfile
  }
}
export const editProfile = inputProfile => {
  return {
    type: EDIT_PROFILE,
    inputProfile
  }
}
export const getProfile = dataProfile => {
  return {
    type: GET_PROFILE,
    dataProfile
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
    console.log(inputProfile)
    axios.post(URI, inputProfile)
    .then(({data}) => {
         console.log(data)
      dispatch(addProfile(data))
      dispatch(finishAddProfile())
    })
    .catch(err => {
      console.log(err)
    })
    // inputProfile['_id'] = '5a21680ccf5895722c668c8a'
    // setTimeout(function(){ 
    //   dispatch(startAddProfile())
    //   dispatch(addProfile(inputProfile))
    //   console.log(inputProfile)
    // }, 2000);
    // dispatch(finishAddProfile())  
  }
}
export const getProfileAPI = (id) => {
  return (dispatch, getState) => {
     axios.get(URI+'/'+id)
    .then(({data}) => {
      console.log(data)
      dispatch(getProfile(data))
      dispatch(finishAddProfile())
    })
  }
}
export const editProfileAPI = (inputProfile, id) => {
  return (dispatch, getState) => {
    axios.put(URI+'/'+id, inputProfile)
    .then(({data}) => {
      dispatch(editProfile(data))
    })
  }
}