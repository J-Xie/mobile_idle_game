import _ from 'lodash';
import { woodLogs } from '../../logs/logs';

export const ADD_WOOD = 'ADD_WOOD';
export const REMOVE_WOOD = 'REMOVE_WOOD';
export const CHANGE_MAX_LOGS = 'CHANGE_MAX_LOGS';

export const addWood = ({ nbWood }) => ({
  type: ADD_WOOD,
  payload: {
    nbWood,
    log: _.sample(woodLogs),
  },
});
export const removeWood = nbWood => ({
  type: REMOVE_WOOD,
  payload: {
    nbWood,
  },
});
export const changeMaxLogs = maxLogs => ({
  type: CHANGE_MAX_LOGS,
  payload: {
    maxLogs,
  },
});
