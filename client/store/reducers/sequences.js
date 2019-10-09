import { UPDATE_SEQUENCES, UPDATE_SEQUENCES_ERROR } from './index';

//action creators
export const updateSequences = sequences => ({
  type: UPDATE_SEQUENCES,
  sequences
});

export const updateSequencesError = error => ({
  type: UPDATE_SEQUENCES_ERROR,
  error
});

//thunk creators
export const updateSequencesThunk = sequences => {
  return dispatch => {
    try {
      console.log('THUNK SEQUENCES', sequences);
      dispatch(updateSequences(sequences));
    } catch (error) {
      dispatch(updateSequencesError(error));
    }
  };
};

//sub-reducer for sequences
export default function sequences(state = {}, action) {
  switch (action.type) {
    case UPDATE_SEQUENCES:
      return action.sequences;
    default:
      return state;
  }
}
