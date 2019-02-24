import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { map, tail, without } from 'lodash';
import posed, { Transition } from 'react-native-pose';

import { Text } from '..';
import { notifBg } from '../../../config/theme';

const Context = React.createContext();

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
  },
  inner: {
    flex: 1,
    alignItems: 'flex-end',
  },
  notif: {
    marginHorizontal: 4,
    marginTop: 4,
    padding: 4,
    // maxWidth: 200,
    borderRadius: '$borderRadius',
    opacity: 0.9,
  },
  title: {
    fontSize: 14,
  },
  message: {
    fontSize: 12,
  },
});

const Box = posed.View({
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 150 },
});

const Notifs = ({ notifs, removeNotif }) => (
  <View style={styles.container}>
    <View style={styles.inner}>
      <Transition>
        {map(notifs, notif => (
          <Box key={notif.id}>
            <TouchableOpacity onPress={() => removeNotif(notif)}>
              <View
                style={[
                  styles.notif,
                  { backgroundColor: notifBg.light[notif.type] },
                ]}
              >
                <Text style={styles.title}>{notif.title}</Text>
                <Text style={styles.message}>{notif.message}</Text>
              </View>
            </TouchableOpacity>
          </Box>
        ))}
      </Transition>
    </View>
  </View>
);
Notifs.propTypes = {
  notifs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.string,
      type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    })
  ).isRequired,
  removeNotif: PropTypes.func.isRequired,
};

export class NotifProvider extends React.Component {
  static propTypes = {
    maxNotif: PropTypes.number,
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    maxNotif: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
      addNotif: this.addNotif,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  addNotif = (title, message, type = 'info') => {
    this.setState(state => {
      const notifs = [
        ...state.notifs,
        {
          id: Math.random().toString(),
          title,
          message,
          type,
        },
      ];

      const { maxNotif } = this.props;
      if (maxNotif && notifs.length > maxNotif) {
        notifs.splice(notifs.maxNotif - 1, notifs.length - maxNotif);
      }
      return {
        ...state,
        notifs,
      };
    });
    this.startCleanNotif();
  };

  removeNotif = notif => {
    this.setState(state => ({
      ...state,
      notifs: without(state.notifs, notif),
    }));
  };

  startCleanNotif() {
    if (this.timeout) {
      return;
    }

    this.timeout = setTimeout(() => {
      delete this.timeout;

      const {
        notifs: { length },
      } = this.state;
      this.setState(state => ({
        ...state,
        notifs: tail(state.notifs),
      }));

      if (length > 1) {
        this.startCleanNotif();
      }
    }, 3500);
  }

  render() {
    const { children } = this.props;
    const { notifs } = this.state;
    return (
      <Context.Provider value={this.state}>
        {children}
        <Notifs notifs={notifs} removeNotif={this.removeNotif} />
      </Context.Provider>
    );
  }
}


() => {
  const memoizedFunc = _.memoize(ft);

};

export const withAddNotif = (
  propName = 'addNotif'
) => BaseComponent => props => (
  <Context.Consumer>
    {value => <BaseComponent {...props} {...{ [propName]: value.addNotif }} />}
  </Context.Consumer>
);
