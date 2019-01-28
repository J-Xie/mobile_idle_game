import { random } from 'lodash';

export const terrains = [
  {
    name: 'normal',
    forest: 0.3,
    cave: 0.1,
    plain: 0.6,
  },
  {
    name: 'rocky',
    forest: 0.2,
    cave: 0.5,
    plain: 0.3,
  },
];

const terrainCoef = size => Math.exp(size) * random(29, 30, true);

export const generateTerrain = (distrib, size) => {
  const total = terrainCoef(size);
  const forest = Math.floor(total * distrib.forest);
  const cave = Math.floor(total * distrib.cave);
  const plain = Math.floor(total * distrib.plain);

  return {
    type: distrib.name,
    forest,
    cave,
    plain,
  };
};
