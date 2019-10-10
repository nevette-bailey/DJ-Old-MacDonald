import {
  UPDATE_SOUND,
  UPDATE_SOUND_ERROR,
  RESET_SOUND,
  GET_SOUND,
  GET_SAVED_SOUND
} from './index';

//action creators
export const updateSound = (soundId, arrIndex) => ({
  type: UPDATE_SOUND,
  soundId,
  arrIndex
});

export const getSound = soundId => ({
  type: GET_SOUND,
  soundId
});

export const updateSoundError = error => ({
  type: UPDATE_SOUND_ERROR,
  error
});

export const resetSound = () => ({
  type: RESET_SOUND
});

export const getSavedSound = savedSound => ({
  type: GET_SAVED_SOUND,
  savedSound
});

//thunk creators - currently not making any calls to backend, no Axios

export const getSoundThunk = soundId => {
  return dispatch => {
    dispatch(getSound(soundId));
  };
};

export const updateSoundThunk = (soundId, arrIndex) => {
  return dispatch => {
    try {
      dispatch(updateSound(soundId, arrIndex));
    } catch (error) {
      dispatch(updateSoundError(error));
    }
  };
};

export const resetSoundThunk = () => {
  return dispatch => {
    dispatch(resetSound());
  };
};

// //to create an initial state for sounds once we have more than one sound
const initialArr = Array(16).fill(false);

const soundsInitialState = {
  sound1: Array(16).fill(false),
  sound2: Array(16).fill(false),
  sound3: Array(16).fill(false),
  sound4: Array(16).fill(false),
  sound5: Array(16).fill(false),
  sound6: Array(16).fill(false),
  sound7: Array(16).fill(false),
  sound8: Array(16).fill(false)
};

//sub-reducer for sound
export default function sounds(state = soundsInitialState, action) {
  switch (action.type) {
    case GET_SOUND: {
      return state;
    }
    case GET_SAVED_SOUND: {
      return {
        sound1: action.savedSound.sound1,
        sound2: action.savedSound.sound2,
        sound3: action.savedSound.sound3,
        sound4: action.savedSound.sound4,
        sound5: action.savedSound.sound5,
        sound6: action.savedSound.sound6,
        sound7: action.savedSound.sound7,
        sound8: action.savedSound.sound8
      };
    }
    case UPDATE_SOUND: {
      const soundId = action.soundId;
      const thisSound = [...state[soundId]];
      thisSound[action.arrIndex]
        ? (thisSound[action.arrIndex] = false)
        : (thisSound[action.arrIndex] = true);

      return { ...state, [soundId]: thisSound };
    }
    case RESET_SOUND: {
      return soundsInitialState;
    }
    default:
      return state;
  }
}
