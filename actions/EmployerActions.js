import { queryJobSeekersByPersonality} from './../graphql-client';

export const setSearchResult = (searchResult) => ({
  type: 'SET_SEARCH_RESULT',
  payload: searchResult
});

export const doneSearching = (bool) => ({
  type: 'DONE_SEARCHING',
  payload: bool
});

export const setSearchedCriteria = (criteria) => ({
  type: 'SET_SEARCHED_CRITERIA',
  payload: criteria
});

export const getSearchResult = (criteria) => {
  return (dispatch, getState) => {
    (async function (criteria) {
      dispatch(doneSearching(false));
      try {
        const response = await queryJobSeekersByPersonality(criteria);
        const jobSeekersByPersonality = [].concat(response.data.jobSeekersByPersonality).sort((a, b) => b.similarity - a.similarity);
        const jobSeekersByPersonalityWithAvatar = jobSeekersByPersonality.map(js => {
          return {...js, avatarURI: `https://api.adorable.io/avatars/285/${js.jobSeeker._id}`}
        });
        dispatch(setSearchedCriteria(criteria));
        dispatch(setSearchResult(jobSeekersByPersonalityWithAvatar));
      } catch (err) {
        console.log(err);
      }
    })(criteria)
  }
}
