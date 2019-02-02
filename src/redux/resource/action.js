import { sample, reduce, every, forEach } from 'lodash';
import logs from '../../logs/logs';
import { allResources, unlockDependency } from '../../config/resources';
import { terrains, generateTerrain } from '../../config/maps';
import { selectResources } from './selector';

export const ADD_RESOURCES = 'ADD_RESOURCES';
export const BUY_RESOURCES = 'BUY_RESOURCES';
export const ADD_MULT_RESOURCES = 'ADD_MULT_RESOURCES';
export const ADD_INCOMES = 'ADD_INCOMES';

export const LOAD_MAP = 'LOAD_MAP';

export const CHANGE_MAX_LOGS = 'CHANGE_MAX_LOGS';
export const UNLOCK_RESOURCES = 'UNLOCK_RESOURCES';

export const unlockResources = resourceNames => ({
  type: UNLOCK_RESOURCES,
  payload: {
    resources: resourceNames,
  },
});

const checkUnlock = (resType, getState, dispatch) => {
  const state = getState();
  const resourcesState = selectResources(state);

  // console.log('check', resType, unlockDependency[resType]);
  const resourcesToUnlock = reduce(
    unlockDependency[resType],
    (acc, resource) => {
      const rState = resourcesState[resource.name];
      if (
        !rState.isUnlocked &&
        every(
          resource.req,
          (value, resName) => resourcesState[resName].value >= value
        )
      ) {
        acc.push(resource.name);
      }
      return acc;
    },
    []
  );

  if (resourcesToUnlock.length > 0) {
    dispatch(unlockResources(resourcesToUnlock));
  }
};

export const addMultResources = incomes => (dispatch, getState) => {
  dispatch({
    type: ADD_MULT_RESOURCES,
    payload: incomes,
  });

  forEach(incomes, (value, resName) =>
    checkUnlock(resName, getState, dispatch)
  );
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

export const addIncomes = () => (dispatch, getState) => {
  dispatch({
    type: ADD_INCOMES,
    payload: {},
  });
  forEach(allResources, resource =>
    checkUnlock(resource.name, getState, dispatch)
  );
};

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
