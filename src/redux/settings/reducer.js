import { CHANGE_THEME, RESET } from './action';
import { FINISH_GAME } from '../resource/action';

const initialState = {
  theme: 'dark',
  autosaveFrequency: 1000,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };
    case FINISH_GAME:
      return initialState;
    case RESET:
      return initialState;
    default:
  }
  return state;
};
