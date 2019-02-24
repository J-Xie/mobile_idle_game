import { every, reduce, get, subtract, add, identity } from 'lodash';
import {
  CHANGE_MAX_LOGS,
  UNLOCK_RESOURCES,
  ADD_RESOURCES,
  BUY_RESOURCES,
  CONVERT_RESOURCES,
  LOAD_MAP,
  ADD_INCOMES,
  ADD_MULT_RESOURCES,
  FINISH_GAME,
} from './action';
import { RESET } from '../settings/action';

import {
  initialState as resourceInitialState,
  incomes,
  artifacts,
  allResources,
} from '../../config/resources';

const initialState = {
  ...resourceInitialState,
  map: null,
  mapSize: 1,
  logs: [],
  maxLogs: 15,
};

const addResources = (state, action) => {
  const { type, qty, log } = action.payload;
  const logs = log ? [log, ...state.logs] : state.logs;
  console.log('add resources : ', action.payload);
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

  if (
    state[type].value + qty >= 0 &&
    every(costs, (cost, idx) => cost * qty <= get(state[idx], 'value'))
  ) {
    if (
      (qty < 0 &&
        every(
          allResources[type].linked,
          (value, resName) => -(value * qty) <= get(state[resName], 'value')
        )) ||
      qty > 0
    ) {
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
  }
  return state;
};

// const updateEffects = (state, action) => {
//   const { effects } = action.payload;
//   return {
//     ...state,
//     bonus: reduce(
//       effects,
//       (acc, value, resName) => {
//         const inc = value * state[resName].value;
//         if (inc) {
//           const oldValue = get(acc, resName, 0);
//           acc[resName] = oldValue + inc;
//         }
//         return acc;
//       },
//       { ...state.bonus }
//     ),
//   };
// };

// const applyEffects = state => {
//   const { bonus } = state;
//   return {
//     ...state,
//     ...reduce(
//       bonus,
//       (acc, value, resName) => {
//         if (allResources[resName].type === 'JOB') {
//         }
//         acc[resName] = {};
//         return acc;
//       },
//       {}
//     ),
//   };
// };

// const buyResearch = (state, action) => {
//   buyResources(state, action);
//   updateEffects(state, action);
//   applyEffects(state);
// };

const reduceResModifier = (valueModifier, totalModifier = identity) => (
  state,
  value,
  resName
) => {
  state[resName] = {
    ...state[resName],
    value: valueModifier(state[resName].value, value),
    total: totalModifier(state[resName].total, value),
  };
  return state;
};
const reduceAddRes = reduceResModifier(add, add);
const reduceSubRes = reduceResModifier(subtract);

const convertResources = (state, action) => {
  const { products, results } = action.payload;

  if (every(products, (value, resName) => state[resName].value >= value)) {
    const stateWithoutProducts = reduce(products, reduceSubRes, {
      ...state,
    });
    return reduce(results, reduceAddRes, stateWithoutProducts);
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
          const inc = value * state[resource.name].value;

          if (inc) {
            const oldValue = get(acc, resName, 0);
            acc[resName] = oldValue + inc;
          }
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

const addMultResources = (state, action) =>
  reduce(
    action.payload,
    (acc, value, resName) => {
      acc[resName] = {
        ...acc[resName],
        value: acc[resName].value + value.value,
        total: acc[resName].total + value.total,
      };
      return acc;
    },
    { ...state }
  );

const finishGame = (state, action) => {
  const currentArtifacts = reduce(
    artifacts,
    (acc, value, name) => {
      if (state[name].value) {
        acc[name] = state[name];
      }
      return acc;
    },
    {}
  );
  const bonus = {
    ...reduce(
      currentArtifacts,
      (acc, artifact) => {
        reduce(
          artifact.bonus,
          (acc2, value, resName) => {
            let inc = value;
            if (acc2[resName]) {
              inc = value + acc2[resName];
            }
            acc[resName] = inc;
            return acc2;
          },
          acc
        );
        return acc;
      },
      { ...state.bonus }
    ),
  };
  const { capacity } = action.payload;
  const resourcesToTake = reduce(
    capacity,
    (acc, value, resName) => {
      if (resName === 'villager') {
        acc.availableVillager = {
          isUnlocked: true,
          value: 0,
          total: value,
        };
      }
      let inc = value;
      if (allResources[resName].initialValue) {
        inc += allResources[resName].initialValue;
      }
      if (bonus[resName]) {
        inc += bonus[resName];
      }
      acc[resName] = {
        isUnlocked: true,
        value: inc,
        total: value,
      };
      return acc;
    },
    {}
  );
  console.log(resourcesToTake);
  return {
    ...initialState,
    ...currentArtifacts,
    ...resourcesToTake,
    ...bonus,
    mapSize: state.mapSize + 1,
  };
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
    case CONVERT_RESOURCES:
      return convertResources(state, action);
    case ADD_INCOMES:
      return addIncomes(state);
    case ADD_MULT_RESOURCES:
      return addMultResources(state, action);
    case LOAD_MAP:
      return {
        ...state,
        map: {
          ...state.map,
          ...action.payload.map,
        },
        forest: {
          ...state.forest,
          value: 10,
          total: 10,
        },
        plain: {
          ...state.plain,
          value: 15,
          total: 15,
        },
        cave: {
          ...state.cave,
          value: 20,
          total: 20,
        },
      };
    case CHANGE_MAX_LOGS:
      return {
        ...state,
        maxLogs: action.payload.maxLogs,
      };
    case FINISH_GAME:
      return finishGame(state, action);
    case RESET:
      return initialState;
    default:
  }
  return state;
};
