import { get, map, reduce } from 'lodash';
import { createSelector } from 'reselect';
import { buildings, picks, allResources } from '../../config/resources';
import { selectUnlockedResourceNames } from '../unlockedResources/selector';

export const selectWood = state => get(state, 'resource.wood');
export const selectLogs = state => get(state, 'resource.logs');
export const selectMaxLogs = state => get(state, 'resource.maxLogs');

export const selectResource = (state, name) => get(state, `resource.${name}`);
export const selectResources = state => state.resource;
export const selectMap = state => get(state.resource, 'map');
export const selectForest = state => get(state.resource, 'forest');
export const selectPlain = state => get(state.resource, 'plain');
export const selectCave = state => get(state.resource, 'cave');

export const selectUnlockedBuildingNames = createSelector(
  selectUnlockedResourceNames,
  resourceNames => resourceNames.filter(name => buildings[name])
);

export const selectUnlockedBuildings = createSelector(
  selectUnlockedBuildingNames,
  resourceNames =>
    map(resourceNames, resourceName => allResources[resourceName])
);

export const selectUnlockedPicks = state =>
  reduce(
    picks,
    (acc, pick) => {
      if (state.resource[pick.name].isUnlocked === true) {
        acc.push(pick);
      }
      return acc;
    },
    []
  );

export const selectUnlockedResources = state =>
  reduce(
    allResources,
    (acc, resource) => {
      if (state.resource[resource.name].isUnlocked === true) {
        acc.push(resource);
      }
      return acc;
    },
    []
  );
