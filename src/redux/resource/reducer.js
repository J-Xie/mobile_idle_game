import { every, reduce, get } from 'lodash';
import {
  CHANGE_MAX_LOGS,
  UNLOCK_RESOURCES,
  ADD_RESOURCES,
  BUY_RESOURCES,
} from './action';

import { initialState as resourceInitialState } from '../../config/resources';

const initialState = {
  ...resourceInitialState,
  logs: [],
  maxLogs: 15,
};

const addResources = (state, action) => {
  const { type, qty, log } = action.payload;
  const logs = [log, ...state.logs];

  if (logs.length > state.maxLogs) {
    logs.splice(state.maxLogs, logs.length - state.maxLogs);
  }

  return {
    ...state,
    [type]: {
      ...state[type],
      value: state[type].value + qty,
      total: state[type].total + qty,
    },
    logs,
  };
};

const buyResources = (state, action) => {
  const { type, qty, costs } = action.payload;
  if (every(costs, (cost, idx) => cost * qty <= get(state[idx], 'value'))) {
    return {
      ...state,
      [type]: {
        ...state[type],
        value: state[type].value + qty,
        total: state[type].total + qty,
      },
      ...reduce(
        costs,
        (acc, cost, key) => {
          acc[key] = {
            ...state[key],
            value: state[key].value - cost * qty,
          };
          return acc;
        },
        {}
      ),
    };
  }
  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESOURCES:
      return addResources(state, action);
    case UNLOCK_RESOURCES:
      return {
        ...state,
        ...action.payload.resources.reduce((acc, resource) => {
          acc[resource] = {
            ...state[resource],
            isUnlocked: true,
          };
          return acc;
        }, {}),
      };
    case BUY_RESOURCES:
      return buyResources(state, action);
    case CHANGE_MAX_LOGS:
      return {
        ...state,
        maxLogs: action.payload.maxLogs,
      };
    default:
  }
  return state;
};
