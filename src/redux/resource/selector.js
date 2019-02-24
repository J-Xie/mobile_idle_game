import { get, map, reduce, some, filter } from 'lodash';
import { createSelector } from 'reselect';
import {
  buildings,
  picks,
  incomes,
  jobs,
  researchs,
  allResources,
  conversions,
  ships,
  artifacts,
} from '../../config/resources';
import { selectUnlockedResourceNames } from '../unlockedResources/selector';

export const selectWood = state => get(state, 'resource.wood');
export const selectLogs = state => get(state, 'resource.logs');
export const selectMaxLogs = state => get(state, 'resource.maxLogs');

export const selectResource = (state, name) => get(state, `resource.${name}`);
export const selectIsResUnlocked = (state, name) =>
  get(state, `resource.${name}.isUnlocked`);
export const selectIsAnyJobUnlocked = state =>
  some(jobs, job => selectIsResUnlocked(state, job.name));
export const selectIsResearchUnlocked = state =>
  some(researchs, research => selectIsResUnlocked(state, research.name));
export const selectIsShipUnlocked = state =>
  some(allResources, resource => {
    if (
      resource.name === 'bark' ||
      resource.name === 'frigate' ||
      resource.name === 'caravel'
    ) {
      return selectIsResUnlocked(state, resource.name);
    }
    return false;
  });
// export const selectShips = createSelector(
//   selectUnlockedResourceNames,
//   resNames => resNames.filter(resName => ships[resName])
// );
export const selectShips = state =>
  reduce(
    state.resource,
    (acc, res, resName) => {
      if (ships[resName]) {
        acc[resName] = {
          value: res.value,
          ...ships[resName],
        };
      }
      return acc;
    },
    {}
  );

export const selectCurrentShip = createSelector(
  selectShips,
  stateShips =>
    reduce(
      stateShips,
      (acc, res) => {
        if (res.value) {
          acc.name = res.name;
          acc.capacity = ships[res.name].capacity;
        }
        return acc;
      },
      {}
    )
);
// export const selectCurrentShip = state => {
//   const ship = { name: '', capacity: {} };
//   if (state.resource.bark.value) {
//     ship.name = 'bark';
//     ship.capacity = ships.bark.capacity;
//   } else if (state.resource.frigate.value) {
//     ship.name = 'frigate';
//     ship.capacity = ships.frigate.capacity;
//   } else if (state.resource.caravel.value) {
//     ship.name = 'caravel';
//     ship.capacity = ships.caravel.capacity;
//   }
//   return ship;
// };

export const selectResources = state => state.resource;
export const selectMap = state => get(state.resource, 'map');
export const selectForest = state => get(state.resource, 'forest');
export const selectPlain = state => get(state.resource, 'plain');
export const selectCave = state => get(state.resource, 'cave');
export const selectShip = (state, shipName) => get(state.resource, shipName);

export const selectUnlockedBuildingNames = createSelector(
  selectUnlockedResourceNames,
  resourceNames => resourceNames.filter(name => buildings[name] || ships[name])
);

export const selectUnlockedBuildings = createSelector(
  selectUnlockedBuildingNames,
  resourceNames =>
    map(resourceNames, resourceName => allResources[resourceName])
);

export const selectUnlockedResNameMap = createSelector(
  selectUnlockedResourceNames,
  resourceNames =>
    reduce(
      resourceNames,
      (acc, resName) => {
        acc[resName] = true;
        return acc;
      },
      {}
    )
);

export const selectUnlockedConversions = createSelector(
  selectUnlockedResNameMap,
  unlockedResNameMap =>
    reduce(
      conversions,
      (acc, conversion) => {
        const unlockedConverters = filter(
          conversion.converters,
          converter => unlockedResNameMap[converter.name]
        );
        if (unlockedConverters.length) {
          acc.push({
            title: conversion.title,
            converters: unlockedConverters,
          });
        }
        return acc;
      },
      []
    )
);

export const selectUnlockedArtifacts = createSelector(
  selectUnlockedResourceNames,
  resourceNames =>
    reduce(
      resourceNames,
      (acc, resName) => {
        if (artifacts[resName]) {
          acc.push({
            name: artifacts[resName].name,
            desc: artifacts[resName].desc,
          });
        }
        return acc;
      },
      []
    )
);

// export const selectUnlockedConversions = createSelector(
//   selectUnlockedConversionNames,
//   resourceNames =>
//     reduce(conversions, (acc, conversion) => {
//       reduce(conversion.converters, (acc, converter => {
//         if ()))
//       }

// acc.push({
//   title: conversion.name,
//   converters: reduce(
//   conversion.converters,
//   (acc2, converter) => {
//     if (
//       some(resourceNames, resourceName => converter.name === resourceName)
//     ) {
//       acc2.push({
//         title:
//       })
// acc2.push({
//   title: conversion.title,
//   ...filter(
//     conversion.converters,
//     converter => converter.name === resourceName
//   ),
// });
//     }
//     console.log(conversion.title);
//     return acc2;
//   },
//   acc
// )
// },
//   []
// );

export const selectCurrentIncomes = createSelector(
  selectResources,
  stateRes =>
    reduce(
      incomes,
      (acc, resDesc) => {
        if (stateRes[resDesc.name].value > 0) {
          acc.push({
            name: resDesc.name,
            incomes: map(resDesc.income, (value, resName) => ({
              type: resName,
              perUnit: value,
              total: Number((value * stateRes[resDesc.name].value).toFixed(1)),
            })),
          });
        }
        return acc;
      },
      []
    )
);

// export const selectJobs = createSelector(
//   selectResources,
//   resources =>
//     console.log(jobs, resources) ||
//     reduce(
//       resources,
//       (acc, resource, resName) => {
//         if (jobs[resName]) {
//           acc.push({
//             name: resName,
//             ...resource,
//           });
//         }
//         return acc;
//       },
//       []
//     )
// );

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
