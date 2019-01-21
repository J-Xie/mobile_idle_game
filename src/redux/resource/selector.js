import _ from 'lodash';

export const selectWood = state => _.get(state, 'resource.wood');
export const selectLogs = state => _.get(state, 'resource.logs');
export const selectMaxLogs = state => _.get(state, 'resource.maxLogs');
