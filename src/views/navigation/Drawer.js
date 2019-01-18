import { Drawer } from 'native-base';

import Sidebar from './navigation/Sidebar';

import Homepage from '../Homepage';
import ResourceList from '../ResourceListView';

export default props => (
    <Drawer
        content={<Sidebar navigator={this.navigator} />}
    >
        {...props}
    </Drawer>
);
