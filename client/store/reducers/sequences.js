import {
  UPDATE_SEQUENCES,
  UPDATE_SEQUENCES_ERROR,
  UPDATE_ONE_SEQUENCE,
  UPDATE_ONE_SEQUENCE_ERROR
} from './index';

//action creators
export const updateSequences = sequences => ({
  type: UPDATE_SEQUENCES,
  sequences
});

export const updateOneSequence = (sequence, idx, param) => ({
  type: UPDATE_ONE_SEQUENCE,
  sequence,
  idx,
  param
});

export const updateSequencesError = error => ({
  type: UPDATE_SEQUENCES_ERROR,
  error
});

export const updateOneSequenceError = error => ({
  type: UPDATE_ONE_SEQUENCE_ERROR,
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

export const updateOneSequenceThunk = (sequence, idx, param) => {
  return dispatch => {
    try {
      dispatch(updateOneSequence(sequence, idx, param));
    } catch (error) {
      dispatch(updateOneSequenceError(error));
    }
  };
};

//sub-reducer for sequences
export default function sequences(state = {}, action) {
  switch (action.type) {
    case UPDATE_SEQUENCES:
      return action.sequences;
    case UPDATE_ONE_SEQUENCE: {
      if (state[action.sequence]) {
        const thisSequence = Object.create(state[action.sequence]);
        const thisSequenceProto = Object.getPrototypeOf(thisSequence);
        thisSequenceProto.at(action.idx, action.param);
        return { ...state, [action.sequence]: thisSequenceProto };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
