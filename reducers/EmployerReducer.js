const defaultState = {
  searchResult: null,
  doneSearching: null,
  searchedCriteria: []
}

const EmployerReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'DONE_SEARCHING':
      return {...state, doneSearching: false, searchResult: null, searchedCriteria: []};
    case 'SET_SEARCH_RESULT':
      return {...state, searchResult: action.payload, doneSearching: true};
    case 'SET_SEARCHED_CRITERIA':
      return {...state, searchedCriteria: action.payload};
    default:
      return state;
  }
}

export default EmployerReducer;