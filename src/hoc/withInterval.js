import { lifecycle } from 'recompose';

export default (ft, delay) =>
  lifecycle({
    componentDidMount() {
      this.interval = setInterval(() => {
        ft(this.props);
      }, delay);
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    },
  });
