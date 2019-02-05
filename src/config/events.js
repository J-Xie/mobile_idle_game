import { map, reduce, sumBy, random, sample } from 'lodash';
import { allResources } from './resources';

const createRes = (value, total = value) => ({
  value,
  total,
});

const getSpaceLeft = (stateMap, stateRes, resName) =>
  stateMap[resName] - stateRes[resName].total;

const createNotifMessage = incomes =>
  map(incomes, (income, resName) => `+ ${income.value} ${resName}`).join(', ');

// RANDOM EVENTS PART
const villagerEvents = [
  {
    conditions: (stateMap, stateRes) => stateRes.availableVillager.value > 0,
    incomes: () => ({
      villager: createRes(1),
      availableVillager: createRes(-1, 0),
    }),
    notif: () => ({
      type: 'info',
      title: sample(['New villager.', 'Stranger arrives.']),
      message: 'Someone arrived',
    }),
    range: () => 0.2,
  },
  {
    conditions: (stateMap, stateRes) => stateRes.availableVillager.value > 5,
    incomes: () => {
      const qty = random(1, 5);
      return {
        villager: createRes(qty),
        availableVillager: createRes(-qty, 0),
      };
    },
    notif: incomes => ({
      type: 'info',
      title: sample(['Extending your population', 'New family.']),
      message: `A new family arrived in your village. ${createNotifMessage(
        incomes
      )}`,
    }),
    range: () => 0.2,
  },
];

const randomEvents = [
  {
    conditions: (stateMap, stateRes) =>
      stateRes.villager.value >= 1 && stateRes.availableVillager.value >= 5,
    incomes: (stateMap, stateRes) => {
      const nbHut = random(1, Math.floor(stateRes.availableVillager.value / 5));
      return {
        villager: createRes(-random(1, stateRes.villager.value), 0),
        availableVillager: createRes(-nbHut * 5, 0),
        hut: createRes(-nbHut, 0),
      };
    },
    notif: () => ({
      type: 'error',
      title: 'Beasts attack.',
      message: "Some of your huts and villagers didn't survive the attack.",
    }),
    range: () => 0.05,
  },
  {
    conditions: (stateMap, stateRes) =>
      stateRes.wood.value >= 50 && stateRes.iron.value >= 10,
    incomes: () => ({
      wood: createRes(-random(20, 50), 0),
      iron: createRes(-random(1, 5), 0),
    }),
    notif: incomes => ({
      type: 'warning',
      title: 'Thieves',
      message: `You discovered some footprints on the ground and found out by following them that some resources are missing. ${createNotifMessage(
        incomes
      )}`,
    }),
    range: () => 0.05,
  },
  {
    conditions: () => true,
    incomes: () => {},
    notif: () => ({
      type: 'info',
      title: 'Strange noises',
      message:
        'You heard some noises but found nothing but darkness in the end.',
    }),
    range: () => 0.02,
  },
  {
    conditions: () => true,
    incomes: () => {},
    notif: () => ({
      type: 'info',
      title: 'Itinerant merchant',
      message: '',
    }),
    range: () => 0.02,
  },
];

// EXPLORATION PART
const explorationEvents = [
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
  {
    conditions: () => true,
    incomes: () => ({
      wood: createRes(random(1, 10)),
    }),
    notif: incomes => ({
      type: 'success',
      title: 'Found some wood.',
      message: createNotifMessage(incomes),
    }),
    range: () => 0.15,
  },
  {
    conditions: (stateMap, stateRes) =>
      getSpaceLeft(stateMap, stateRes, 'ironDeposit') > 0,
    incomes: () => ({
      ironDeposit: createRes(1),
    }),
    notif: incomes => ({
      type: 'success',
      title: 'Iron deposit found.',
      message: createNotifMessage(incomes),
    }),
    range: () => 0.1,
  },
  {
    conditions: (stateMap, stateRes) =>
      getSpaceLeft(stateMap, stateRes, 'goldDeposit') > 0,
    incomes: () => ({
      goldDeposit: createRes(1),
    }),
    notif: incomes => ({
      type: 'success',
      title: 'Gold deposit found.',
      message: createNotifMessage(incomes),
    }),
    range: () => 0.1,
  },
  {
    conditions: (stateMap, stateRes) => stateRes.wood > 30,
    incomes: () => ({
      wood: createRes(random(-50, -10), 0),
    }),
    notif: incomes => ({
      type: 'warning',
      title: 'Ambush.',
      message: createNotifMessage(incomes),
    }),
    range: () => 0.1,
  },
  {
    conditions: () => true,
    incomes: () => {},
    notif: () => ({
      type: 'warning',
      title: 'Safety first.',
      message:
        'A best came out of nowhere, your villagers fled as far as possible.',
    }),
    range: () => 0.15,
  },
  {
    conditions: (stateMap, stateRes) => stateRes.villager.value > 3,
    incomes: () => ({
      villager: createRes(random(-3, -1), 0),
    }),
    notif: incomes => ({
      type: 'error',
      title: 'Dangerous cave.',
      message: `Your exploration squad ventured into a cave. Only a few came back from their trip.${createNotifMessage(
        incomes
      )}`,
    }),
    range: () => 0.05,
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
  {
    name: 'ironDeposit',
    mapType: {},
    defaultValue: 10,
    income: () => ({ ironDeposit: createRes(1) }),
  },
  // {
  //   name: 'goldDeposit',
  //   mapType: {},
  //   defaultValue: 10,
  //   income: () => createRes(1),
  // },
];

const makeMapEventGenerator = (
  resName,
  getRange,
  income = (stateMap, stateRes) => ({
    [resName]: createRes(random(1, getSpaceLeft(stateMap, stateRes, resName))),
  })
) => {
  if (!allResources[resName]) {
    console.warn('[make-map-event-generator] not defined resources', resName);
  }
  return makeResEventGenerator(
    (stateMap, stateRes) => getSpaceLeft(stateMap, stateRes, resName) > 0,
    income,
    incomes => ({
      type: 'success',
      title: `${resName} found.`,
      message: createNotifMessage(incomes),
    }),
    getRange
  );
};

const genMapRange = (distrib, defaultValue) => stateMap => {
  if (distrib[stateMap.name]) {
    return distrib[stateMap.name];
  }
  return defaultValue;
};

const genMapEvents = terrains.map(terrain =>
  makeMapEventGenerator(
    terrain.name,
    genMapRange(terrain.mapType, terrain.defaultValue),
    terrain.income
  )
);

const genResEvents = explorationEvents.map(event =>
  makeResEventGenerator(
    event.conditions,
    event.incomes,
    event.notif,
    event.range
  )
);

const explorationEventGenerators = [
  ...genMapEvents,
  nothingEvent,
  ...genResEvents,
];

const genVillagerEvents = villagerEvents.map(event =>
  makeResEventGenerator(
    event.conditions,
    event.incomes,
    event.notif,
    event.range
  )
);
const genRandomEvents = randomEvents.map(event =>
  makeResEventGenerator(
    event.conditions,
    event.incomes,
    event.notif,
    event.range
  )
);

const randomEventGenerators = [...genVillagerEvents, ...genRandomEvents];

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

export const createEvent = eventGenerators => (stateMap, stateRes) => {
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

export const createExplorationEvent = createEvent(explorationEventGenerators);
export const createVillagerEvent = createEvent(randomEventGenerators);
