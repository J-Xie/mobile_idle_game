import { sample, reduce, every } from 'lodash';
import logs from '../../logs/logs';
import { allResources } from '../../config/resources';
import { terrains, generateTerrain } from '../../config/maps';
import { selectResources } from './selector';

export const ADD_RESOURCES = 'ADD_RESOURCES';
export const BUY_RESOURCES = 'BUY_RESOURCES';
export const ADD_INCOMES = 'ADD_INCOMES';

export const LOAD_MAP = 'LOAD_MAP';

export const CHANGE_MAX_LOGS = 'CHANGE_MAX_LOGS';
export const UNLOCK_RESOURCES = 'UNLOCK_RESOURCES';

export const unlockResources = resources => ({
  type: UNLOCK_RESOURCES,
  payload: {
    resources,
  },
});

const checkUnlock = (resType, getState, dispatch) => {
  const state = getState();
  const resourcesState = selectResources(state);

  const resourcesToUnlock = reduce(
    allResources,
    (acc, resource, name) => {
      const rState = resourcesState[name];
      if (
        resource.req[resType] &&
        !rState.isUnlocked &&
        every(
          resource.req,
          (value, resName) => resourcesState[resName].value >= value
        )
      ) {
        acc.push(name);
      }
      return acc;
    },
    []
  );

  if (resourcesToUnlock.length > 0) {
    dispatch(unlockResources(resourcesToUnlock));
  }
};

export const addResources = ({ type, qty }) => (dispatch, getState) => {
  dispatch({
    type: ADD_RESOURCES,
    payload: {
      type,
      qty,
      log: sample(logs[type]),
    },
  });

  checkUnlock(type, getState, dispatch);
};

export const buyResources = ({ type, qty }) => (dispatch, getState) => {
  dispatch({
    type: BUY_RESOURCES,
    payload: {
      type,
      qty,
      costs: allResources[type].cost,
    },
  });
  checkUnlock(type, getState, dispatch);
};

export const addIncomes = () => ({
  type: ADD_INCOMES,
  payload: {},
});

export const loadMap = (size = 1) => ({
  type: LOAD_MAP,
  payload: {
    map: generateTerrain(sample(terrains), size),
  },
});

export const changeMaxLogs = maxLogs => ({
  type: CHANGE_MAX_LOGS,
  payload: {
    maxLogs,
  },
});
