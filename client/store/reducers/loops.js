import { SAVE_LOOP, CREATE_NEW_LOOP } from './index';
import axios from 'axios';

const saveLoop = id => ({
  type: SAVE_LOOP,
  id
});

const createNewLoop = () => ({
  type: CREATE_NEW_LOOP
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
//???????
export const createNewLoopThunk = () => async dispatch => {
  dispatch(createNewLoop());
};

const initialState = {
  id: null
};
export default function loops(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOOP: {
      return action.id;
    }
    case CREATE_NEW_LOOP: {
      return;
    }
    default:
      return state;
  }
}
