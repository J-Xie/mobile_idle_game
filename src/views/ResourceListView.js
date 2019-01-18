import React from 'react';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { StyleSheet, View } from 'react-native';
import { Content, Button, Text } from 'native-base';

import CustomButton from './components/Button';

const styles = StyleSheet.create({
    container: {
        margin: 'auto',
    },
    button: {
        marginBottom: 10,
    }
})

const ResourceListView = ({ gold, onIncrementGold, totalGold, villager, onIncrementVillager }) => (
    <Content style={styles.container}>
        <Button light bordered onPress={onIncrementGold}>
            <Text>Find gold</Text>
        </Button>
        {totalGold >= 30
        ? (gold >= 30 + (5 * villager)
          ? <Button onPress={() => onIncrementVillager(30 + (5 * villager))} bordered light>
                <Text>
                    Get villager{"\n"}
                    Cost: {30 + (5 * villager)}
                </Text>
            </Button>
          : <Button disabled bordered>
                <Text>
                    Get villager{"\n"}
                    Cost: {30 + (5 * villager)}
                </Text>
            </Button>)
        : null
        }
        <Text>You have {gold} gold.</Text>
        <Text>You have {villager} villagers.</Text>
    </Content>
);

export default compose(
    withState('villager', 'setVillager', 0),
    withState('totalVillager', 'setTotalVillager', 0),
    withState('gold', 'setGold', 0),
    withState('totalGold', 'setTotalGold', 0),
    withHandlers({
        onIncrementGold: (props) => () => {
            props.setGold(props.gold + 1);
            props.setTotalGold(props.totalGold + 1)
        },
        onDecrementGold: (props) => nbGold => {
            props.setGold(props.gold - nbGold);
        },
        onIncrementVillager: (props) => nbGold => {
            props.setVillager(props.villager + 1);
            props.setTotalVillager(props.totalVillager + 1);
            props.setGold(props.gold - nbGold);
        },
    }),
    lifecycle({
        componentDidMount () {
            alert('Component mounted');
        },
        componentWillUnmount() {
            clearInterval(props.id);
        }
    }),
    withState('id', 'setId', 0),
)(ResourceListView);

// export default class ResourceListView extends React.PureComponent {
//     render() {
//         return (
//             <View>
//                 <Button title='Click'></Button>
//                 <Text>This is a test button.</Text>
//             </View>
//         )
//     }
// }