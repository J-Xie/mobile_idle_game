import { forEach } from 'lodash';

import woodIcon from '../assets/wood.png';
import hutIcon from '../assets/hut.png';
import forestIcon from '../assets/forest.png';
import caveIcon from '../assets/cave.png';
import plainIcon from '../assets/prairie.png';
import scienceIcon from '../assets/idea.png';
import labIcon from '../assets/chemistry.png';
import forgeIcon from '../assets/blacksmith.png';
import harbourIcon from '../assets/lighthouse.png';
import sawmillIcon from '../assets/saw.png';
import villagerIcon from '../assets/farmer.png';

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

      acc.allResources[elem.name] = elem;
      if (elem.income && Object.keys(elem.income).length) {
        acc.incomes[elem.name] = elem;
      }

      forEach(elem.req, (value, resName) => {
        if (!acc.unlockDependency[resName]) {
          acc.unlockDependency[resName] = [];
        }
        acc.unlockDependency[resName].push(elem);
      });

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
      incomes: {},
      unlockDependency: {},
      allResources: {},
    }
  );

export const {
  initialState,
  buildings,
  picks,
  incomes,
  allResources,
  unlockDependency,
} = createResources(
  {
    name: 'wood',
    buttonText: 'Pick up wood',
    type: PICK,
    icon: woodIcon,
    cost: {},
    req: {},
    income: {},
    isUnlocked: true,
  },
  {
    name: 'hut',
    buttonText: 'Build hut',
    type: BUILDING,
    icon: hutIcon,
    req: {
      wood: 20,
    },
    cost: {
      wood: 20,
      plain: 2,
    },
    isUnlocked: false,
    linked: {
      availableVillager: 5,
    },
    income: {},
  },
  {
    name: 'sawmill',
    buttonText: 'Build sawmill',
    type: BUILDING,
    icon: sawmillIcon,
    req: {
      wood: 20,
    },
    // initialValue: 1,
    cost: {
      wood: 20,
      forest: 5,
    },
    isUnlocked: false,
    linked: {},
    income: {
      wood: 1,
    },
  },
  {
    name: 'villager',
    type: RAW,
    icon: villagerIcon,
    req: {
      hut: 1,
    },
    cost: {
      availableVillager: 1,
    },
    income: {},
    isUnlocked: false,
  },
  {
    name: 'availableVillager',
    type: RAW,
    icon: '',
    req: {
      hut: 1,
    },
    cost: {},
    income: {},
    isUnlocked: false,
  },
  {
    name: 'science',
    buttonText: 'Study',
    type: PICK,
    icon: scienceIcon,
    req: {
      hut: 1,
    },
    cost: {
      wood: 10,
    },
    income: {},
    isUnlocked: false,
  },
  {
    name: 'laboratory',
    buttonText: 'Create laboratory',
    type: BUILDING,
    icon: labIcon,
    req: {
      science: 50,
    },
    cost: {
      science: 50,
    },
    income: {
      science: 1,
    },
  },
  {
    name: 'ironDeposit',
    type: RAW,
    icon: '',
    req: {},
    cost: {},
    income: {},
  },
  {
    name: 'ironMine',
    buttonText: 'Iron mine',
    type: BUILDING,
    icon: '',
    req: {
      ironDeposit: 1,
    },
    cost: {
      ironDeposit: 1,
    },
    linked: {
      ironMinerJob: 5,
    },
    income: {},
  },
  {
    name: 'iron',
    type: RAW,
    icon: '',
    req: {},
    cost: {},
    income: {},
  },
  {
    name: 'ironMinerJob',
    type: RAW,
    icon: '',
    req: {
      ironMine: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'ironMiner',
    type: PICK,
    icon: '',
    req: {
      ironMinerJob: 1,
    },
    cost: {
      villager: 1,
    },
    income: {
      iron: 1,
    },
  },
  {
    name: 'forge',
    buttonText: 'Create forge',
    type: BUILDING,
    icon: forgeIcon,
    req: {
      plain: 2,
    },
    cost: {
      wood: 100,
      iron: 10,
      plain: 5,
    },
    income: {},
    isUnlocked: false,
  },
  {
    name: 'equipment',
    buttonText: 'Buy equipment',
    type: BUILDING,
    icon: '',
    req: {
      forge: 1,
    },
    cost: {},
    income: {},
    isUnlocked: false,
  },
  {
    name: 'harbour',
    buttonText: 'Construct harbour',
    type: BUILDING,
    icon: harbourIcon,
    req: {
      wood: 50,
      plain: 10,
    },
    cost: {
      wood: 50,
      plain: 10,
    },
    income: {},
    isUnlocked: false,
  },
  {
    name: 'ship',
    type: BUILDING,
    icon: '',
    req: {
      port: 1,
    },
    cost: {
      wood: 100,
      plain: 5,
    },
    income: {},
  },
  {
    name: 'forest',
    type: RAW,
    icon: forestIcon,
    req: {},
    cost: {},
    income: {},
    isUnlocked: true,
  },
  {
    name: 'plain',
    type: RAW,
    icon: plainIcon,
    req: {},
    cost: {},
    income: {},
    isUnlocked: true,
  },
  {
    name: 'cave',
    type: RAW,
    icon: caveIcon,
    req: {},
    cost: {},
    income: {},
    isUnlocked: true,
  }
);
