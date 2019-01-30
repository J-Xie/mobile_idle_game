import { combineReducers } from 'redux';
import resource from '../resource/reducer';
import settings from '../settings/reducer';
import unlockedResources from '../unlockedResources/reducer';

export default combineReducers({
  resource,
  settings,
  unlockedResources,
});
