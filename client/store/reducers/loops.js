import { SAVE_LOOP, GET_LOOPS, CREATE_NEW_LOOP } from './index';
import axios from 'axios';
import { resetSound } from './sounds';

const saveLoop = savedLoop => ({
  type: SAVE_LOOP,
  savedLoop
});

const createNewLoop = () => ({
  type: CREATE_NEW_LOOP
});

export const getLoops = allLoops => ({
  type: GET_LOOPS,
  allLoops
});

export const saveLoopThunk = (sound, loopId) => {
  return async dispatch => {
    try {
      sound.title = '';
      if (loopId === null) {
        const { data } = await axios.post('/api/loops/', sound);
        dispatch(saveLoop(data));
      } else {
        // we still need to write a put route

        const { data } = await axios.put(`/api/loops/${loopId}`, sound);
        dispatch(saveLoop(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createNewLoopThunk = () => dispatch => {
  dispatch(resetSound()); //import resetSound and use it here to reset the state
  dispatch(createNewLoop());
};

export const gotLoopsThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/loops/');
    dispatch(getLoops(data));
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  id: null,
  allLoops: []
};

export default function loops(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOOP: {
      return { ...state, id: action.savedLoop.id };
    }
    case CREATE_NEW_LOOP: {
      return { ...state, id: null };
    }
    case GET_LOOPS: {
      return { ...state, allLoops: action.allLoops };
    }
    default:
      return state;
  }
}
