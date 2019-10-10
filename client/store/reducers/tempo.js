import { UPDATE_TEMPO, UPDATE_TEMPO_ERROR } from './index';

//action creators
export const updateTempo = tempo => ({
  type: UPDATE_TEMPO,
  tempo
});

export const updateTempoError = error => ({
  type: UPDATE_TEMPO_ERROR,
  error
});

//thunk creators
export const updateTempoThunk = tempo => {
  return dispatch => {
    try {
      dispatch(updateTempo(tempo));
    } catch (error) {
      dispatch(updateTempoError(error));
    }
  };
};

//sub-reducer for tempo
export default function tempo(state = 160, action) {
  switch (action.type) {
    case UPDATE_TEMPO:
      return action.tempo;
    default:
      return state;
  }
}
