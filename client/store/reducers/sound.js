import { UPDATE_SOUND, UPDATE_SOUND_ERROR } from './index';

//action creators
export const updateSound = (soundId, arrIndex) => ({
  type: UPDATE_SOUND,
  soundId,
  arrIndex
});

export const updateSoundError = error => ({
  type: UPDATE_SOUND_ERROR,
  error
});

//thunk creators - currently not making any calls to backend, no Axios
export const updateSoundThunk = (soundId, arrIndex) => {
  return dispatch => {
    try {
      dispatch(updateSound(soundId, arrIndex));
    } catch (error) {
      dispatch(updateSoundError(error));
    }
  };
};

//sub-reducer for sound
export default function sounds(state = {}, action) {
  switch (action.type) {
    case UPDATE_SOUND:
      const thisSound = state.sounds[action.soundId];
      const soundId = action.soundId;
      thisSound[action.arrIndex]
        ? (thisSound[action.arrIndex] = false)
        : (thisSound[action.arrIndex] = true);

      return { ...state, [soundId]: thisSound };
    default:
      return state;
  }
}
