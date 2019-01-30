import { reduce } from 'lodash';
import { allResources } from '../../config/resources';
import { UNLOCK_RESOURCES } from '../resource/action';

const initialState = reduce(
  allResources,
  (acc, resource, name) => {
    if (resource.isUnlocked) {
      acc.push(name);
    }
    return acc;
  },
  []
);

export default (state = initialState, action) => {
  switch (action.type) {
    case UNLOCK_RESOURCES:
      return [...state, ...action.payload.resources];
    default:
  }
  return state;
};
