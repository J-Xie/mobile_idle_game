const BUILDING = 'BUILDING';
const PICK = 'PICK';
const RAW = 'RAW';

const createResources = (...resources) =>
  resources.reduce(
    (acc, elem) => {
      acc.initialState[elem.name] = {
        value: elem.initialValue || 0,
        total: elem.initialValue || 0,
        isUnlocked: elem.isUnlocked || false,
      };

      switch (elem.type) {
        case BUILDING:
          acc.buildings[elem.name] = elem;
          break;
        case PICK:
          acc.picks[elem.name] = elem;
          break;
        case RAW:
          break;
        default:
          throw new Error(`Undefined resource type :: ${JSON.stringify(elem)}`);
      }
      return acc;
    },
    {
      initialState: {},
      buildings: {},
      picks: {},
    }
  );

export const { initialState, buildings, picks } = createResources(
  {
    name: 'wood',
    buttonText: 'Pick up wood',
    type: PICK,
    cost: {},
    req: {},
    income: {},
    isUnlocked: true,
  },
  {
    name: 'hut',
    type: BUILDING,
    req: {
      wood: 50,
    },
    cost: {
      wood: 5,
      // forest: 3,
    },
    isUnlocked: true,
    income: {},
  },
  {
    name: 'science',
    buttonText: 'Study',
    type: PICK,
    req: {
      hut: 1,
    },
    cost: {
      wood: 10,
    },
    income: {
      science: 1,
    },
  },
  {
    name: 'ironMine',
    type: BUILDING,
    req: {
      ironDeposit: 1,
      cave: 5,
    },
    cost: {
      ironDeposit: 1,
      cave: 5,
    },
    income: {
      needed: {
        villagers: 5,
      },
      iron: 1,
    },
  },
  {
    name: 'forge',
    type: BUILDING,
    req: {
      plain: 2,
    },
    cost: {},
    income: {},
  },
  {
    name: 'equipment',
    type: RAW,
    req: {
      villager: 1,
    },
  },
  {
    name: 'port',
    type: BUILDING,
    req: {
      wood: 200,
      plain: 10,
    },
    cost: {},
    income: {},
  },
  {
    name: 'ship',
    type: BUILDING,
    req: {
      port: 1,
    },
    cost: {
      wood: 100,
      plain: 5,
    },
    income: {},
  }
);
