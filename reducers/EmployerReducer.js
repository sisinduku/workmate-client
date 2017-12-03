const defaultState = {
  searchResult: null,
  doneSearching: null
}

const EmployerReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'DONE_SEARCHING':
      return {...state, doneSearching: false};
    case 'SET_SEARCH_RESULT':
      return {...state, searchResult: action.payload, doneSearching: true};
    default:
      return state;
  }
}

export default EmployerReducer;