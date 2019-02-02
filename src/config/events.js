// Scale la range des events (nb d'events)
// Checker disponibilité des espaces
// Créer events dynamiques

import { map, reduce, sumBy, random } from 'lodash';

// event: {
//   discovery: () => ({
//     resFound: {
//       [resName]: number,
//     },
//     resFound: {
//      [resName]: { value: number, total: number }
//     },
//     notif: {
//       type: string,
//       title: string,
//       message: string,
//     },
//   }),
//   range: number,
// }
// eventGenerator:(stateMap, stateResources) => event;

const createRes = (value, total = value) => ({
  value,
  total,
});

const createNotifMessage = incomes =>
  map(incomes, (income, resName) => `+ ${income.value} ${resName}`).join(', ');

const availableEvents = [
  {
    conditions: (stateMap, stateRes) =>
      stateRes.availableVillager.value >= 5 && stateRes.plain.value >= 5,
    incomes: () => ({
      villager: createRes(5),
      hut: createRes(1),
      availableVillager: createRes(-5, 0),
      plain: createRes(0, 5),
    }),
    notif: incomes => ({
      type: 'success',
      title: 'New village found.',
      message: createNotifMessage(incomes),
    }),
    range: () => 0.1,
  },
];

const nothingEvent = () => ({
  discovery: () => ({
    resFound: null,
    notif: {
      type: 'info',
      title: 'Nothing found.',
      message: 'Nothing was found.',
    },
  }),
  range: 0.2,
});

const makeResEventGenerator = (conditions, incomes, notif, getRange) => (
  stateMap,
  stateRes
) => {
  if (conditions(stateMap, stateRes)) {
    const resFound = incomes(stateMap, stateRes);
    return {
      discovery: () => ({
        resFound,
        notif: notif(resFound),
      }),
      range: getRange(stateMap, stateRes),
    };
  }
  return null;
};

const terrains = [
  {
    name: 'forest',
    mapType: {
      jungle: 0.7,
      normal: 0.2,
      rocky: 0.1,
    },
    defaultValue: 0.2,
  },
  {
    name: 'plain',
    mapType: {
      jungle: 0.3,
      normal: 0.6,
      rocky: 0.3,
    },
    defaultValue: 0.3,
  },
  {
    name: 'cave',
    mapType: {
      jungle: 0.2,
      normal: 0.2,
      rocky: 0.6,
    },
    defaultValue: 0.1,
  },
];

const getSpaceLeft = (stateMap, stateRes, resName) =>
  stateMap[resName] - stateRes[resName].total;

const makeMapEventGenerator = (resName, getRange) =>
  makeResEventGenerator(
    (stateMap, stateRes) => getSpaceLeft(stateMap, stateRes, resName) > 0,
    (stateMap, stateRes) => ({
      [resName]: createRes(
        random(1, getSpaceLeft(stateMap, stateRes, resName))
      ),
    }),
    () => ({
      type: 'success',
      title: `${resName} found.`,
      message: `Found ${resName}`,
    }),
    getRange
  );

const genMapRange = (distrib, defaultValue) => stateMap => {
  if (distrib[stateMap.name]) {
    return distrib[stateMap.name];
  }
  return defaultValue;
};

const genMapEvents = terrains.map(terrain =>
  makeMapEventGenerator(
    terrain.name,
    genMapRange(terrain.mapType, terrain.defaultValue)
  )
);

const genResEvents = availableEvents.map(event =>
  makeResEventGenerator(
    event.conditions,
    event.incomes,
    event.notif,
    event.range
  )
);

const eventGenerators = [...genMapEvents, nothingEvent, ...genResEvents];

const scaleRange = events => {
  const totalRange = sumBy(events, 'range');
  return reduce(
    events,
    (acc, event) => {
      acc.events.push({
        ...event,
        range: (acc.sum + event.range) / totalRange,
      });
      acc.sum += event.range;
      return acc;
    },
    { sum: 0, events: [] }
  ).events;
};

const getRandomEvent = events => {
  const rng = Math.random();
  return events.find(event => event.range >= rng);
};

export const createEvent = (stateMap, stateRes) => {
  const events = eventGenerators
    .map(generator => generator(stateMap, stateRes))
    .filter(event => event !== null);
  const scaledEvents = scaleRange(events);
  const event = getRandomEvent(scaledEvents);
  if (!event) {
    return {};
  }
  return event.discovery();
};

// const eventList = [
//   {
//     name: 'forest',
//     notif: (name, type, discovered) => ({
//       type,
//       title: 'Discovered forest space.',
//       message: `+ ${discovered} forest`,
//     }),
//     range: 0.2,
//   },
//   {
//     name: 'nothing',
//     notif: () => ({
//       type: 'info',
//       title: 'Nothing found',
//       message: 'Nothing :(.',
//     }),
//     range: 0.1,
//   },
//   {
//     type: 'success',
//     name: 'plain',
//     title: '',
//     message: msg => msg,
//     range: 0.2,
//   },
//   {
//     type: 'success',
//     name: 'cave',
//     title: '',
//     message: msg => msg,
//     range: 0.2,
//   },
//   {
//     type: 'success',
//     name: 'ironDeposit',
//     title: '',
//     message: msg => msg,
//     range: 0.2,
//   },
// ];

// const scaleRange = events => {
//   const totalRange = sumBy(events, 'range');
//   return reduce(
//     events,
//     (acc, event) => {
//       acc.events.push({
//         ...event,
//         range: (acc.sum + event.range) / totalRange,
//       });
//       acc.sum += event.range;
//       return acc;
//     },
//     { sum: 0, events: [] }
//   ).events;
// };

// const canBeDiscovered = (stateMap, stateResources, resName) => {
//   const toDiscover = stateMap[resName] - stateResources[resName].total;
//   if (toDiscover > 0) {
//     return true;
//   }
//   return false;
// };

// const createDiscovery = (event, map, stateResources) => {
//   const discovered = random(
//     1,
//     map[event.name] - stateResources[event.name].total
//   );
//   return event.notif(discovered);
// };

// export const createEvents = (stateMap, stateResources) => {
//   const availableEvents = filter(eventList, event =>
//     canBeDiscovered(stateMap, stateResources, event.name)
//   );
//   const scaledEvents = scaleRange(availableEvents);
//   const rng = Math.random();
//   const e = scaledEvents.find(event => event.range >= rng);
//   // const notif = ;
//   console.log('event: ', e);
//   return;
// };

export const eventTypeRange = [
  {
    name: 'success',
    range: 0.2,
  },
  {
    name: 'info',
    range: 0.5,
  },
  {
    name: 'warning',
    range: 0.75,
  },
  {
    name: 'error',
    range: 1,
  },
];

export const spaceRange = [
  {
    name: 'forest',
    range: 0.33,
  },
  {
    name: 'plain',
    range: 0.66,
  },
  {
    name: 'cave',
    range: 1,
  },
];

export const resourceRange = [
  {
    name: 'wood',
    range: 0.7,
  },
  {
    name: 'iron',
    range: 0.8,
  },
  {
    name: 'ironDeposit',
    range: 1,
  },
];
