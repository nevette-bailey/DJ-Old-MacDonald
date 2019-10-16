import {
  SAVE_LOOP,
  GET_LOOPS,
  CREATE_NEW_LOOP,
  GET_ONE_LOOP,
  DELETE_LOOP,
  SAVED_FALSE,
  CLEAR_LOOPS,
  RESET_SOUND,
  IS_SAVED
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

export const deleteLoop = id => ({
  type: DELETE_LOOP,
  id
});

export const isNotSaved = () => ({
  type: SAVED_FALSE
});

export const isSaved = () => ({
  type: IS_SAVED
});

export const clearLoops = () => ({
  type: CLEAR_LOOPS
});

export const saveLoopThunk = (sounds, loopId, title, description) => {
  return async dispatch => {
    try {
      if (title !== undefined) {
        sounds.title = title;
        sounds.description = description;
      }
      if (loopId === null) {
        const { data } = await axios.post('/api/loops/', sounds);
        dispatch(saveLoop(data));
      } else {
        await axios.put(`/api/loops/${loopId}`, sounds);
        dispatch(isSaved());
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

export const deleteLoopThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/loops/${id}`);
      dispatch(deleteLoop(id));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  id: null,
  allLoops: [],
  isSaved: true,
  title: null
};

// eslint-disable-next-line complexity
export default function loops(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOOP: {
      return {
        ...state,
        id: action.savedLoop.id,
        isSaved: true,
        title: action.savedLoop.title
      };
    }
    case IS_SAVED: {
      return { ...state, isSaved: true };
    }
    case CREATE_NEW_LOOP: {
      return { ...state, id: null, isSaved: true, title: null };
    }
    case GET_LOOPS: {
      return { ...state, allLoops: action.allLoops };
    }
    case GET_ONE_LOOP: {
      return { ...state, id: action.oneLoop.id, title: action.oneLoop.title };
    }
    case DELETE_LOOP: {
      {
        const prevLoops = [...state.allLoops];
        const updatedLoops = prevLoops.filter(loop => loop.id !== action.id);
        return { ...state, allLoops: updatedLoops, id: null };
      }
    }
    case SAVED_FALSE: {
      return { ...state, isSaved: false };
    }
    case CLEAR_LOOPS: {
      return initialState;
    }
    case RESET_SOUND: {
      if (!state.id) return { ...state, isSaved: true };
    }

    default:
      return state;
  }
}
