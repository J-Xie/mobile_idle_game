import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Link } from 'react-router-native';
import {
  List, ListItem, Button, Text,
} from 'native-base';

const routes = [{
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
}];


// export default () => (
//     <FlatList
//         data={routes}
//         renderItem={({item}) => <Link to={item.link} key={item.name}><Text>{item.name}</Text></Link>}
//         style={styles.container}
//     />
// )

export default ({ navigator }) => (
  <List
    style={styles.container}
    dataArray={routes}
    renderRow={data => (
      <ListItem button onPress={() => navigator.navigate(`${data.name}`)}>
        <Text>{data.name}</Text>
      </ListItem>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  link: {
    flex: 1,
  },
});
