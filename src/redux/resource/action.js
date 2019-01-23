import { sample, reduce, every } from 'lodash';
import logs from '../../logs/logs';
import { buildings } from '../../config/resources';
import { selectResources } from './selector';

export const ADD_RESOURCES = 'ADD_RESOURCES';
export const BUY_RESOURCES = 'BUY_RESOURCES';

export const CHANGE_MAX_LOGS = 'CHANGE_MAX_LOGS';
export const UNLOCK_RESOURCES = 'UNLOCK_RESOURCES';

export const unlockResources = resources => ({
  type: UNLOCK_RESOURCES,
  payload: {
    resources,
  },
});

export const addResources = ({ type, qty }) => (dispatch, getState) => {
  dispatch({
    type: ADD_RESOURCES,
    payload: {
      type,
      qty,
      log: logs[type] && sample(logs[type]),
    },
  });

  const resType = type;
  const state = getState();
  const resourcesState = selectResources(state);

  const buildingToUnlock = reduce(
    buildings,
    (acc, building, name) => {
      const rState = resourcesState[name];
      if (
        building.req[resType] &&
        !rState.isUnlocked &&
        every(
          building.req,
          (value, resName) => resourcesState[resName].value >= value
        )
      ) {
        acc.push(name);
      }
      return acc;
    },
    []
  );

  if (buildingToUnlock.length > 0) {
    dispatch(unlockResources(buildingToUnlock));
  }
};

export const buyResources = ({ type, qty }) => ({
  type: BUY_RESOURCES,
  payload: {
    type,
    qty,
    costs: buildings[type].cost,
  },
});

export const changeMaxLogs = maxLogs => ({
  type: CHANGE_MAX_LOGS,
  payload: {
    maxLogs,
  },
});
