import {
  SAVE_LOOP,
  GET_LOOPS,
  CREATE_NEW_LOOP,
  GET_ONE_LOOP,
  SAVED_FALSE
} from './index';
import axios from 'axios';
import { resetSound, getSavedSound } from './sounds';

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

export const getOneLoop = oneLoop => ({
  type: GET_ONE_LOOP,
  oneLoop
});

export const isNotSaved = () => ({
  type: SAVED_FALSE
});

export const saveLoopThunk = (title, description, sounds, loopId) => {
  return async dispatch => {
    try {
      sounds.title = title;
      sounds.description = description;
      if (loopId === null) {
        const { data } = await axios.post('/api/loops/', sounds);
        dispatch(saveLoop(data));
      } else {
        const { data } = await axios.put(`/api/loops/${loopId}`, sounds);
        dispatch(saveLoop(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOneLoopThunk = loopId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/loops/${loopId}`);
      console.log(data);
      dispatch(getOneLoop(data));
      dispatch(getSavedSound(data));
    } catch (err) {
      console.error(err);
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
  allLoops: [],
  isSaved: true
};

export default function loops(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOOP: {
      return { ...state, id: action.savedLoop.id, isSaved: true };
    }
    case CREATE_NEW_LOOP: {
      return { ...state, id: null };
    }
    case GET_LOOPS: {
      return { ...state, allLoops: action.allLoops };
    }
    case GET_ONE_LOOP: {
      return { ...state, id: action.oneLoop.id };
    }
    case SAVED_FALSE: {
      return { ...state, isSaved: false };
    }
    default:
      return state;
  }
}
