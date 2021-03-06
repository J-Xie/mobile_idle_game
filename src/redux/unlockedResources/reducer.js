import { reduce, uniq } from 'lodash';
import { allResources } from '../../config/resources';
import { UNLOCK_RESOURCES, FINISH_GAME } from '../resource/action';
import { RESET } from '../settings/action';

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
      return uniq([...state, ...action.payload.resources]);
    case FINISH_GAME:
      return initialState;
    case RESET:
      return initialState;
    default:
  }
  return state;
};
