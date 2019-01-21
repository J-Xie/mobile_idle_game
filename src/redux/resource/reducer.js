import { ADD_WOOD, REMOVE_WOOD, CHANGE_MAX_LOGS } from './action';

const withRes = (resName, defaultValue = 0) => ({
  [resName]: defaultValue,
  [`total${resName}`]: defaultValue,
});

const initialState = {
  ...withRes('wood'),
  logs: [],
  maxLogs: 15,
};

const addWood = (state, action) => {
  const { nbWood, log } = action.payload;
  const logs = [log, ...state.logs];

  console.log(logs.length, state.maxLogs);
  if (logs.length > state.maxLogs) {
    logs.splice(state.maxLogs, logs.length - state.maxLogs);
  }

  return {
    ...state,
    wood: state.wood + nbWood,
    totalWood: state.totalWood + nbWood,
    logs,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WOOD: return addWood(state, action);
    case REMOVE_WOOD:
      return {
        ...state,
        wood: state.wood - action.payload.nbWood,
      };
    case CHANGE_MAX_LOGS:
      return {
        ...state,
        maxLogs: action.payload.maxLogs,
      };
    default:
  }
  return state;
};
