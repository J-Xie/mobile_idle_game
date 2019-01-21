import { CHANGE_LOG_NB, CHANGE_THEME, CHANGE_SAVE_FREQUENCY } from './action';

const initialState = {
  theme: 'light',
  autosaveFrequency: 1000,
};

export default (state = initialState, action) => {
  // const { maxLog, theme } = action.payload;
  console.log(action.payload);
  // switch (action.type) {
  //   case CHANGE_LOG_NB: return {
  //     ...state,
  //     maxLog,
  //   };
  //   case CHANGE_THEME: return {
  //     ...state,
  //     theme,
  //   };
  //   case CHANGE_SAVE_FREQUENCY: return {
  //     ...state,
  //   };
  //   default:
  // }
  return state;
};
