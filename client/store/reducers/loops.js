import { SAVE_LOOP, GET_LOOPS } from './index';
import axios from 'axios';

const saveLoop = id => ({
  type: SAVE_LOOP,
  id
});

export const getLoops = allLoops => ({
  type: GET_LOOPS,
  allLoops
});

export const saveLoopThunk = (sound, loopId) => {
  return async dispatch => {
    try {
      sound.title = '';
      if (!loopId) {
        const { data } = await axios.post('/api/users/loops/', sound);
        dispatch(saveLoop(data.id));
      } else {
        const { data } = await axios.put('/api/users/loops/', sound);
        dispatch(saveLoop(data.id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const gotLoopsThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/loops');
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
      return action.id;
    }
    case GET_LOOPS: {
      return { ...state, allLoops: action.allLoops };
    }
    default:
      return state;
  }
}
