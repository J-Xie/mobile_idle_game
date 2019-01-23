import { CHANGE_THEME } from './action';

const initialState = {
  theme: 'light',
  autosaveFrequency: 1000,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
  }
  return state;
};
