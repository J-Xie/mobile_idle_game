export const CHANGE_LOG_NB = 'CHANGE_LOGS_NB';
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_SAVE_FREQUENCY = 'CHANGE_SAVE_FREQUENCY';
export const RESET = 'RESET';

export const changeLogNb = maxLogs => ({
  type: CHANGE_LOG_NB,
  payload: {
    maxLogs,
  },
});

export const changeTheme = theme => ({
  type: CHANGE_THEME,
  payload: {
    theme,
  },
});

export const changeSaveFrequency = ({ delay }) => ({
  type: CHANGE_SAVE_FREQUENCY,
  payload: {
    delay,
  },
});

export const reset = () => ({
  type: RESET,
});
