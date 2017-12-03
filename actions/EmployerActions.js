import axios from 'axios';

export const setSearchResult = (searchResult) => ({
  type: 'SET_SEARCH_RESULT',
  payload: searchResult
});

export const doneSearching = (bool) => ({
  type: 'DONE_SEARCHING',
  payload: bool
});

export const getSearchResult = (criteria) => {
  const URL = 'https://api-workmate.mepawz.com/search_personality/';

  return (dispatch, getState) => {
    dispatch(doneSearching(false));
    axios.post(URL, criteria)
    .then(resp => {
      dispatch(setSearchResult(resp.data))
    })
    .catch(err => {
      throw err;
    });
  }
}