import { combineReducers } from 'redux';
import resource from '../resource/reducer';
import settings from '../settings/reducer';

export default combineReducers({
  resource,
  settings,
});
