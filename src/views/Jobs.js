import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { selectResources } from '../redux/resource/selector';
import { jobs } from '../config/resources';
import { Button, Text } from './components';
import Cost from './Cost';
import { buyResources } from '../redux/resource/action';

const itemStyle = EStyleSheet.create({
  card: {
    borderColor: '$textColor',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    // borderBottomStartRadius: 5,
    // borderTopEndRadius: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  bottomBorder: {
    borderBottomColor: '$textColor',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    width: '33%',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  infos: {
    justifyContent: 'center',
    maxWidth: 150,
    flexWrap: 'wrap',
  },
  text: {
    textAlign: 'center',
  },
  actionText: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

const JobItem = ({ job, resources, buyResources }) => (
  <View style={itemStyle.card}>
    <View key={job.name} style={[itemStyle.container, itemStyle.bottomBorder]}>
      <View style={itemStyle.header}>
        {/* <Image width={32} height={32} source={job.icon || ''} /> */}
        <Text>{job.name}</Text>
      </View>

      <View style={itemStyle.actions}>
        <Button
          text="-"
          onPress={() => buyResources({ type: job.name, qty: -1 })}
        />
        <View style={itemStyle.infos}>
          <Text style={[itemStyle.text, itemStyle.actionText]}>
            {resources[job.name].value}
          </Text>
          {/* <Cost costs={job.cost} /> */}
        </View>
        <Button
          text="+"
          onPress={() => buyResources({ type: job.name, qty: 1 })}
        />
      </View>
    </View>
    <View style={itemStyle.container}>
      <View style={{ width: '50%', ...itemStyle.infos }}>
        <Text>Income(s) :</Text>
        <Cost costs={job.income} />
      </View>
      <View style={itemStyle.infos}>
        <Text>Cost(s) :</Text>
        <Cost costs={job.cost} />
      </View>
    </View>
  </View>
);
// JobItem.propTypes = {
//   job: ,
// };

const Job = compose(
  connect(
    state => ({ resources: selectResources(state) }),
    { buyResources }
  )
)(JobItem);

const Jobs = ({ resources }) => (
  <View>
    {map(jobs, job => {
      if (resources[job.name].isUnlocked) {
        return <Job key={job.name} job={job} />;
      }
      return null;
    })}
  </View>
);
Jobs.propTypes = {
  resources: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ resources: selectResources(state) }))
)(Jobs);
