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
        name: 'ironDeposit',
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
        name: 'goldDeposit',
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
    deposit: [
      {
        name: 'ironDeposit',
        coefs: [
          {
            minSize: 0,
            coef: 0.4,
          },
          {
            minSize: 2,
            coef: 0.6,
          },
        ],
        coef: 1,
      },
      {
        name: 'goldDeposit',
        coefs: [
          {
            minSize: 0,
            coef: 0.2,
          },
          {
            minSize: 3,
            coef: 0.3,
          },
        ],
        coef: 0.3,
      },
    ],
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
  console.log('total deposit : ', totalDeposit);

  const depositConfig = reduce(
    distrib.deposit,
    (acc, { name, coefs }) => {
      const config = findLast(coefs, elem => elem.minSize <= size);
      acc[name] = Math.ceil(config.coef * totalDeposit * 2);
      return acc;
    },
    {}
  );

  return {
    type: distrib.name,
    forest,
    cave,
    plain,
    ...depositConfig,
  };
};
