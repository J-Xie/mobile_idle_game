import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { selectMap } from '../redux/resource/selector';
import { loadMap } from '../redux/resource/action';

const LoadMap = ({ children }) => children;

export default compose(
  connect(
    state => ({ map: selectMap(state) }),
    { loadMap }
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.map) {
        this.props.loadMap();
      }
    },
  })
)(LoadMap);
