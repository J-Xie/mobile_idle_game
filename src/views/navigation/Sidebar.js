import React from 'react';
import { FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Link } from 'react-router-native';
import { List, ListItem, Button, Text } from 'native-base';

const routes = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Resources',
    link: '/resourceList',
  },
  {
    name: 'Income',
    link: '/income',
  },
  {
    name: 'Settings',
    link: '/settings',
  },
];

// export default () => (
//     <FlatList
//         data={routes}
//         renderItem={({item}) => <Link to={item.link} key={item.name}><Text>{item.name}</Text></Link>}
//         style={styles.container}
//     />
// )

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$bgColor',
  },
  link: {
    flex: 1,
  },
  text: {
    color: '$textColor',
  },
});

export default ({ navigator }) => (
  <List
    style={styles.container}
    dataArray={routes}
    renderRow={data => (
      <ListItem button onPress={() => navigator.navigate(`${data.name}`)}>
        <Text style={styles.text}>{data.name}</Text>
      </ListItem>
    )}
  />
);
