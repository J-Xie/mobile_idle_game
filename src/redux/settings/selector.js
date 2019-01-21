import _ from 'lodash';

export const selectMaxLog = state => _.get(state, 'resource.maxLogs');
export const selectTheme = state => _.get(state, 'settings.theme');
