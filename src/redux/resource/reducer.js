import { every, reduce, get } from 'lodash';
import {
  CHANGE_MAX_LOGS,
  UNLOCK_RESOURCES,
  ADD_RESOURCES,
  BUY_RESOURCES,
  LOAD_MAP,
  ADD_INCOMES,
} from './action';
import { RESET } from '../settings/action';

import {
  initialState as resourceInitialState,
  incomes,
  allResources,
} from '../../config/resources';

const initialState = {
  ...resourceInitialState,
  map: null,
  logs: [],
  maxLogs: 15,
};

const addResources = (state, action) => {
  const { type, qty, log } = action.payload;
  const logs = log ? [log, ...state.logs] : state.logs;

  if (log && logs.length > state.maxLogs) {
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
      ...reduce(
        allResources[type].linked,
        (acc, resource, key) => {
          acc[key] = {
            ...state[key],
            value: state[key].value + resource * qty,
            total: state[key].total + resource * qty,
          };
          return acc;
        },
        {}
      ),
    };
  }
  return state;
};

const addIncomes = state => {
  const totalIncomes = reduce(
    incomes,
    (acc, resource) =>
      reduce(
        resource.income,
        (acc, value, resName) => {
          const oldValue = get(acc, resName, 0);
          acc[resName] = value * state[resource.name].value + oldValue;
          return acc;
        },
        acc
      ),
    {}
  );

  if (!Object.keys(totalIncomes).length) {
    return state;
  }

  return reduce(
    totalIncomes,
    (acc, value, resName) => {
      acc[resName] = {
        ...acc[resName],
        value: acc[resName].value + value,
        total: acc[resName].total + value,
      };
      return acc;
    },
    { ...state }
  );
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
    case ADD_INCOMES:
      return addIncomes(state);
    case LOAD_MAP:
      return {
        ...state,
        map: action.payload.map,
        forest: {
          ...state.forest,
          value: 10,
          total: action.payload.map.forest,
        },
        plain: {
          ...state.plain,
          value: 15,
          total: action.payload.map.plain,
        },
        cave: {
          ...state.cave,
          value: 5,
          total: action.payload.map.cave,
        },
      };
    case CHANGE_MAX_LOGS:
      return {
        ...state,
        maxLogs: action.payload.maxLogs,
      };
    case RESET:
      return initialState;
    default:
  }
  return state;
};
