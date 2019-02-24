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
import pearlIcon from '../assets/pearl.png';

const BUILDING = 'BUILDING';
const PICK = 'PICK';
const RAW = 'RAW';
const JOB = 'JOB';
const RESEARCH = 'RESEARCH';
const CONVERSION = 'CONVERSION';
const SHIP = 'SHIP';
const ARTIFACT = 'ARTIFACT';

const a = [
  {
    name: '1',
    product: {
      a: 1,
      b: 2,
    },
    result: {
      ironDeposit: 1,
    },
  },
  {
    name: '2',
    product: {
      a: 1,
    },
    result: {
      goldDeposit: 1,
    },
  },
  {
    name: '3',
    product: {},
    result: {
      ironDeposit: 2,
    },
  },
  {
    name: '4',
    result: {
      ironDeposit: 4,
      goldDeposit: 2,
    },
  },
];

const results = [
  {
    title: 'ironDeposit',
    converters: [{ name: '1' }, { name: '3' }],
  },
  {
    title: 'goldDeposit',
    converters: [{ name: '2' }],
  },
  {
    title: 'ironDeposit + goldDeposit',
    converters: [{ name: '4' }],
  },
];

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
        case JOB:
          acc.jobs[elem.name] = elem;
          break;
        case RESEARCH:
          acc.researchs[elem.name] = elem;
          break;
        case CONVERSION:
          {
            const key = Object.keys(elem.result)
              .sort()
              .join(' + ');
            if (!acc.conversions[key]) {
              acc.conversions[key] = {
                title: key,
                converters: [],
              };
            }
            acc.conversions[key].converters.push(elem);
          }
          break;
        case SHIP:
          acc.ships[elem.name] = elem;
          break;
        case ARTIFACT:
          acc.artifacts[elem.name] = elem;
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
      jobs: {},
      researchs: {},
      conversions: {},
      artifacts: {},
      ships: {},
      unlockDependency: {},
      allResources: {},
    }
  );

export const {
  initialState,
  buildings,
  picks,
  incomes,
  jobs,
  researchs,
  conversions,
  artifacts,
  ships,
  allResources,
  unlockDependency,
} = createResources(
  {
    name: 'wood',
    buttonText: 'Pick up wood',
    type: PICK,
    icon: woodIcon,
    initialValue: 20000,
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
      wood: 50,
      forest: 5,
    },
    // initialValue: 1,
    cost: {
      wood: 50,
      forest: 5,
    },
    linked: {
      lumberjackJob: 5,
    },
    income: {},
  },
  {
    name: 'lumberjackJob',
    type: RAW,
    icon: '',
    req: {
      sawmill: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'lumberjack',
    buttonText: 'Form lumberjack',
    type: JOB,
    icon: '',
    req: {
      lumberjackJob: 1,
    },
    cost: {
      villager: 1,
      lumberjackJob: 1,
      science: 10,
    },
    income: {
      wood: 0.1,
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
    initialValue: 2000,
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
      wood: 50,
      science: 50,
    },
    linked: {
      scientistJob: 5,
    },
    income: {},
  },
  {
    name: 'scientistJob',
    type: RAW,
    icon: '',
    req: {
      laboratory: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'scientist',
    buttonText: 'Form scientist',
    type: JOB,
    icon: '',
    req: {
      scientistJob: 1,
    },
    cost: {
      villager: 1,
      scientistJob: 1,
      science: 50,
    },
    income: {
      science: 0.1,
    },
  },
  {
    name: 'recycler',
    buttonText: 'Build recycler',
    desc: 'Build a recycler to convert any given resource into another one.',
    type: RESEARCH,
    icon: '',
    isUnlocked: true,
    initialValue: 1,
    req: {
      laboratory: 1,
      science: 100,
    },
    cost: {
      science: 200,
      plain: 10,
    },
    income: {},
  },
  {
    name: 'recyclerUpgrade',
    buttonText: 'Upgrade recycler',
    desc: 'Upgrade recycler to discover more conversions.',
    type: RESEARCH,
    icon: '',
    req: {
      recycler: 1,
    },
    cost: {
      science: 250,
      equipment: 20,
    },
  },
  {
    name: 'upgradeLumberjackEfficiency',
    buttonText: 'Upgrade sawmill',
    desc: "Improve lumberjack's efficiency in sawmill.",
    type: RESEARCH,
    icon: '',
    req: {
      laboratory: 1,
      science: 200,
    },
    cost: {
      science: 200,
      equipment: 15,
    },
    bonus: {},
    income: {},
  },

  {
    name: 'caveToIronDeposit',
    type: CONVERSION,
    icon: '',
    req: {
      recycler: 1,
    },
    product: {
      cave: 8,
    },
    result: {
      ironDeposit: 1,
    },
  },
  {
    name: 'caveTo2IronDeposits',
    type: CONVERSION,
    icon: '',
    req: {
      recycler: 1,
    },
    product: {
      cave: 15,
    },
    result: {
      ironDeposit: 2,
    },
  },
  {
    name: 'caveToIronDepositPlain',
    type: CONVERSION,
    icon: '',
    req: {
      recycler: 1,
    },
    product: {
      cave: 9,
    },
    result: {
      ironDeposit: 1,
      plain: 1,
    },
  },
  {
    name: 'caveToGoldDeposit',
    type: CONVERSION,
    icon: '',
    req: {
      recycler: 1,
    },
    product: {
      cave: 15,
    },
    result: {
      goldDeposit: 1,
    },
  },
  {
    name: 'caveToForest',
    type: CONVERSION,
    icon: '',
    req: {
      recyclerUpgrade: 1,
    },
    product: {
      cave: 10,
    },
    result: {
      forest: 10,
    },
  },
  {
    name: 'caveToPlain',
    type: CONVERSION,
    icon: '',
    req: {
      recyclerUpgrade: 1,
    },
    product: {
      cave: 10,
    },
    result: {
      plain: 10,
    },
  },
  {
    name: 'plainToForest',
    type: CONVERSION,
    icon: '',
    req: {
      recyclerUpgrade: 1,
    },
    product: {
      plain: 10,
    },
    result: {
      forest: 10,
    },
  },
  {
    name: 'plainToCave',
    type: CONVERSION,
    icon: '',
    req: {
      recyclerUpgrade: 1,
    },
    product: {
      plain: 10,
    },
    result: {
      cave: 10,
    },
  },
  {
    name: 'foresToPlain',
    type: CONVERSION,
    icon: '',
    req: {
      recyclerUpgrade: 1,
    },
    product: {
      forest: 10,
    },
    result: {
      plain: 10,
    },
  },
  {
    name: 'forestToCave',
    type: CONVERSION,
    icon: '',
    req: {
      recyclerUpgrade: 1,
    },
    product: {
      forest: 10,
    },
    result: {
      cave: 10,
    },
  },
  // ...createAllPossibilities({
  //   nameSuffix: 'toIronDeposit',
  //   plain
  // }),
  // {
  //   name: 'toIronDeposit',
  //   type: CONVERSION,
  //   req: {},
  //   product: [{}],
  //   // result:
  // },
  {
    name: 'ironDeposit',
    type: RAW,
    icon: '',
    req: {
      ironDeposit: 1,
    },
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
      cave: 5,
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
    req: {
      iron: 1,
    },
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
    buttonText: 'Form miner',
    type: JOB,
    icon: '',
    req: {
      ironMinerJob: 1,
    },
    cost: {
      villager: 1,
      ironMinerJob: 1,
      science: 50,
    },
    income: {
      iron: 0.1,
    },
  },
  {
    name: 'goldDeposit',
    type: RAW,
    icon: '',
    req: {
      goldDeposit: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'goldMine',
    buttonText: 'Gold mine',
    type: BUILDING,
    icon: '',
    req: {
      goldDeposit: 1,
    },
    cost: {
      goldDeposit: 1,
    },
    linked: {
      goldMinerJob: 5,
    },
    income: {},
  },
  {
    name: 'gold',
    type: RAW,
    icon: '',
    req: {
      gold: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'goldMinerJob',
    type: RAW,
    icon: '',
    req: {
      goldMine: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'goldMiner',
    buttonText: 'Form miner',
    type: JOB,
    icon: '',
    req: {
      goldMinerJob: 1,
    },
    cost: {
      villager: 1,
      goldMinerJob: 1,
      science: 50,
    },
    income: {
      gold: 0.1,
    },
  },
  {
    name: 'forge',
    buttonText: 'Create forge',
    type: BUILDING,
    icon: forgeIcon,
    req: {
      wood: 10,
      // iron: 15,
      plain: 5,
    },
    cost: {
      wood: 10,
      // iron: 15,
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
    cost: {
      iron: 5,
    },
    income: {},
    isUnlocked: false,
  },
  {
    name: 'soldier',
    buttonText: 'Form soldier',
    type: JOB,
    req: {
      equipment: 10,
    },
    cost: {
      equipment: 15,
    },
    income: {},
  },
  {
    name: 'scout',
    buttonText: 'Form scout',
    type: JOB,
    req: {
      equipment: 5,
    },
    cost: {
      equipment: 10,
    },
    income: {},
  },
  {
    name: 'harbour',
    buttonText: 'Construct harbour',
    type: BUILDING,
    icon: harbourIcon,
    req: {
      wood: 300,
      plain: 10,
    },
    cost: {
      wood: 300,
      science: 200,
      plain: 10,
    },
    income: {},
    isUnlocked: false,
  },
  {
    name: 'bark',
    type: SHIP,
    icon: '',
    req: {
      harbour: 1,
    },
    cost: {
      wood: 300,
    },
    capacity: {
      villager: 2,
      wood: 10,
      iron: 5,
    },
    income: {},
  },
  {
    name: 'frigate',
    type: SHIP,
    icon: '',
    req: {
      harbour: 1,
    },
    cost: {
      wood: 400,
    },
    capacity: {
      villager: 5,
      wood: 20,
      iron: 10,
      equipment: 2,
    },
    income: {},
  },
  {
    name: 'caravel',
    type: SHIP,
    icon: '',
    req: {
      harbour: 1,
    },
    cost: {
      wood: 500,
    },
    capacity: {
      villager: 10,
      wood: 20,
      iron: 10,
      gold: 2,
      equipment: 2,
    },
    income: {},
    initialValue: 1,
  },
  {
    name: 'pearl',
    type: RAW,
    icon: pearlIcon,
    req: {
      pearl: 1,
    },
    cost: {},
    income: {},
  },
  {
    name: 'mapDiscovered',
    type: ARTIFACT,
    desc: 'Allow viewing available space on the current island.',
    icon: '',
    req: {
      mapDiscovered: 1,
    },
    cost: {
      pearl: 3,
    },
    income: {},
    isUnlocked: true,
  },
  {
    name: 'buildingDiscovered',
    type: ARTIFACT,
    desc: 'Allow viewing what buildings acquisition unlocks.',
    icon: '',
    req: {
      buildingDiscovered: 1,
    },
    cost: {
      pearl: 3,
    },
    income: {},
    isUnlocked: true,
  },
  {
    name: 'woodStartingPack1',
    type: ARTIFACT,
    desc: 'Start your new journey with some wood.',
    icon: '',
    req: {
      woodStartingPack1: 1,
    },
    cost: {
      pearl: 2,
    },
    income: {},
    bonus: {
      wood: 20,
    },
    isUnlocked: true,
  },
  {
    name: 'woodStartingPack2',
    type: ARTIFACT,
    desc: 'More wood for more effectiveness.',
    icon: '',
    req: {
      woodStartingPack1: 1,
    },
    cost: {
      pearl: 4,
    },
    income: {},
    bonus: {
      wood: 50,
    },
  },
  {
    name: 'villagerStartingPack1',
    type: ARTIFACT,
    desc: 'Bring some villagers along with you.',
    icon: '',
    req: {
      villagerStartingPack1: 1,
    },
    cost: {
      pearl: 2,
    },
    income: {},
    bonus: {
      villager: 2,
    },
    isUnlocked: true,
  },
  {
    name: 'villagerStartingPack2',
    type: ARTIFACT,
    desc: 'We are legion.',
    icon: '',
    req: {
      villagerStartingPack1: 1,
    },
    cost: {
      pearl: 5,
    },
    income: {},
    bonus: {
      villager: 5,
    },
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
