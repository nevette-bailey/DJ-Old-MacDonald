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

// //to create an initial state for sounds once we have more than one sound
const initialArr = Array(16).fill(false);

// const soundsInitialState = {
//   sound1: initialArr.fill(false)
// };

//sub-reducer for sound
export default function sounds(state = { sound1: initialArr }, action) {
  switch (action.type) {
    case UPDATE_SOUND: {
      const soundId = action.soundId;
      const thisSound = [...state[soundId]];
      thisSound[action.arrIndex]
        ? (thisSound[action.arrIndex] = false)
        : (thisSound[action.arrIndex] = true);

      return { ...state, [soundId]: thisSound };
    }
    default:
      return state;
  }
}
