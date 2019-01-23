import _ from 'lodash';
import { buildings, picks } from '../../config/resources';

export const selectWood = state => _.get(state, 'resource.wood');
export const selectLogs = state => _.get(state, 'resource.logs');
export const selectMaxLogs = state => _.get(state, 'resource.maxLogs');

export const selectResource = (state, name) => _.get(state, `resource.${name}`);
export const selectResources = state => state.resource;
export const selectUnlockedBuildings = state =>
  _.reduce(
    buildings,
    (acc, building) => {
      if (state.resource[building.name].isUnlocked === true) {
        acc.push(building);
      }
      return acc;
    },
    []
  );
export const selectUnlockedPicks = state =>
  _.reduce(
    picks,
    (acc, pick) => {
      if (state.resource[pick.name].isUnlocked === true) {
        acc.push(pick);
      }
      return acc;
    },
    []
  );
