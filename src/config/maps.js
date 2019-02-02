import { random, reduce, findLast } from 'lodash';

export const terrains = [
  {
    name: 'normal',
    forest: 0.3,
    cave: 0.1,
    plain: 0.6,
    depositCoef: 1,
    deposit: [
      {
        name: 'iron',
        coefs: [
          {
            minSize: 0,
            coef: 0.3,
          },
          {
            minSize: 2,
            coef: 0.4,
          },
        ],
        coef: 1,
      },
      {
        name: 'gold',
        coefs: [
          {
            minSize: 0,
            coef: 0.1,
          },
          {
            minSize: 3,
            coef: 0.2,
          },
        ],
        coef: 0.1,
      },
    ],
  },
  {
    name: 'rocky',
    forest: 0.2,
    cave: 0.5,
    plain: 0.3,
    depositCoef: 1.5,
    deposit: [],
  },
];

const terrainCoef = size => Math.exp(size) * random(29, 30, true);
const depositCoef = size => Math.exp(size);

export const generateTerrain = (distrib, size) => {
  const total = terrainCoef(size);
  const forest = Math.floor(total * distrib.forest);
  const cave = Math.floor(total * distrib.cave);
  const plain = Math.floor(total * distrib.plain);

  const totalDeposit = distrib.depositCoef * depositCoef(size);

  const depositConfig = reduce(
    distrib.deposit,
    (acc, { name, coefs }) => {
      const config = findLast(coefs, elem => elem.minSize <= size);
      acc[name] = config.coef * totalDeposit;
      return acc;
    },
    {}
  );

  console.log(':::', depositConfig);
  return {
    type: distrib.name,
    forest,
    cave,
    plain,
    ...depositConfig,
  };
};
